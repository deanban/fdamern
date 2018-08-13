const mongoose = require("mongoose");
const Geocode = require("./models/Geocode");
const db = require("./config/keys").mongoURI;
const fetch = require("node-fetch");
const states = require("./states");

const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyAF3laRwdxS7LqBHaCP5UbQX-ZKOOTFPwE",
  Promise: Promise
});

let saveCounter = 0;
const resultsArr = [];

const URLS = ["http://localhost:3001/api/v1/recalls"];

mongoose
  .connect(db)
  .then(() => console.log("mongodb connection success"))
  .catch(error => console.log(error));

URLS.map(async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    // resultData = [...json.results];
    // console.log(json);
    for (let i = 0; i < json.length; i++) {
      let newObj = {};
      let address = `${json[i].address_1}, ${json[i].city},${json[i].state}`;
      googleMapsClient
        .geocode({ address })
        .asPromise()
        .then(response => {
          fromCoords = response.json.results[0].geometry.location;
          newObj["from"] = { name: address, coordinates: fromCoords };

          const recallStates = json[i].distribution_pattern.match(/[A-Z]{2}/g);

          for (stateCode of recallStates) {
            if (states[stateCode]) {
              toObj = {
                to: { name: stateCode, coordinates: states[stateCode] }
              };
              combinedObj = Object.assign({}, newObj, toObj);
              resultsArr.push(combinedObj);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
      setTimeout(() => {
        geocodes = new Geocode({
          results: resultsArr
        });
        geocodes.save(() => {
          saveCounter++;
          if (saveCounter === json.length) {
            mongoose
              .disconnect()
              .then(() => console.log("mongodb disconnected"))
              .catch(error => console.log(error));
          }
        });
      }, 5000);
    }
  } catch (error) {
    console.log(error);
  }
});
