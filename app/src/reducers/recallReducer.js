import _ from "lodash";
import { Object } from "core-js";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAF3laRwdxS7LqBHaCP5UbQX-ZKOOTFPwE");
Geocode.enableDebug();

function recallsReducer(
  state = { isFetching: false, recalls: [], places: [], coords: [] },
  action
) {
  switch (action.type) {
    case "FETCHING":
      return Object.assign({}, state, { isFetching: true });
    case "FETCHED_DATA":
      return Object.assign({}, state, {
        recalls: action.payload,
        isFetching: false
      });
    case "FIND_DATA":
      return {
        ...state,
        recalls: _.uniqBy(state.recalls.concat(action.payload), "_id")
      };
    case "GET_PLACES":
      return {
        ...state,
        places: state.recalls.map(recall => {
          return Object.assign({
            from: `${recall.address_1}, ${recall.city}, ${recall.state}`,
            to: recall.distribution_pattern.replace(
              /^Distributed to: |and | via retail stores/gi,
              ""
            )
          });
        })
      };
    // case "GEOCODE":
    //   return {
    //     ...state,
    //     LatLng: state.places.map(place => {
    //       let rep = place.from.replace(/ /g, "%20");
    //       let final = rep.replace(/,/g, "%2C");
    //       console.log(final);
    //       fetch(
    //         `https://api.mapbox.com/geocoding/v5/mapbox.places/%20%2Fgeocoding%2Fv5%2Fmapbox.places%2F${final}.json?access_token=pk.eyJ1IjoiZGVhbmIiLCJhIjoiY2o4a3puNm1nMGk0czMzczdjMGNxeTk4NyJ9.EoxbmDIuPQXS5bneM_NNJQ`
    //       )
    //         .then(resp => resp.json())
    //         .then(data => {
    //           data.features.map(geo => {
    //             // console.log(geo.geometry.coordinates);
    //             return Object.assign({
    //               fromGeoCode: geo.geometry.coordinates,
    //               toGeoCode: "test"
    //             });
    //           });
    //         });
    //     })
    // state.places.map(place => {
    //   return Object.assign({
    //     fromGeoCode: `${Geocode.fromAddress(place.from).then(
    //       res => {
    //         const { lat, lng } = res.results[0].geometry.location;
    //         console.log(lat, lng);
    //       },
    //       error => {
    //         console.error(error);
    //       }
    //     )}`,
    //     toGeoCode: place.to
    //   });
    // })
    // };
    default:
      return state;
  }
}

export default recallsReducer;
