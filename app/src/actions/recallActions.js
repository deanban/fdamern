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
