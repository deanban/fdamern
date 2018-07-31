function fetchingRecalls() {
  return {
    type: "FETCHING"
  };
}

function fetchedRecalls(data) {
  return {
    type: "FETCHED_DATA",
    payload: data
  };
}

function findData(data) {
  return {
    type: "FIND_DATA",
    payload: data
  };
}

// export function fetchData() {
//   return function(dispatch) {
//     dispatch(fetchingRecalls());
//     const urls = [
//       'https://api.fda.gov/food/enforcement.json?api_key=4DXoWNhsP5vazpe7CL4eUNZUBksAQJm0CvK72mNP&search=classification:"Class+III"&limit=2',
//       'https://api.fda.gov/food/enforcement.json?api_key=4DXoWNhsP5vazpe7CL4eUNZUBksAQJm0CvK72mNP&search=classification:"Class+II"&limit=2',
//       'https://api.fda.gov/food/enforcement.json?api_key=4DXoWNhsP5vazpe7CL4eUNZUBksAQJm0CvK72mNP&search=classification:"Class+I"&limit=2'
//     ];
//     urls.map(async url => {
//       try {
//         const response = await fetch(url);
//         const json = await response.json();
//         const data = json.results;
//         dispatch(fetchedRecalls(data));
//       } catch (err) {
//         console.log(err);
//       }
//     });
//   };
// }

export function fetchData() {
  return async function(dispatch) {
    dispatch(fetchingRecalls());
    await fetch("http://localhost:3001/api/v1/recalls", {
      method: "GET"
    })
      .then(resp => resp.json())
      .then(json => {
        console.log("fetch", json);
        dispatch(fetchedRecalls(json));
        dispatch(findData(json));
      });
  };
}
