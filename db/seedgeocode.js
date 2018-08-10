const mongoose = require("mongoose");
// const NodeGeocoder = require("node-geocoder");
const Geocode = require("./models/Geocode");
const db = require("./config/keys").mongoURI;
const fetch = require("node-fetch");

// const options = {
//   provider: "google",

//   // Optional depending on the providers
//   httpAdapter: "https", // Default
//   apiKey: "AIzaSyAF3laRwdxS7LqBHaCP5UbQX-ZKOOTFPwE", // for Mapquest, OpenCage, Google Premier
//   formatter: null // 'gpx', 'string', ...
// };
// const geocoder = NodeGeocoder(options);

let saveCounter = 0;

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
    // console.log(resultData);
    for (let i = 0; i < json.length; i++) {
      codeData = new Geocode({
        from: `${json[i].address_1}, ${json[i].city}, ${json[i].state}`,
        to: json[i].distribution_pattern.replace(/^Distributed to: /, "")
      });
      // console.log(temp);
      codeData.save(() => {
        saveCounter++;
        if (saveCounter === json.length) {
          mongoose
            .disconnect()
            .then(() => console.log("mongodb disconnected"))
            .catch(error => console.log(error));
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});
