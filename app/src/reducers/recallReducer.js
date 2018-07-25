const state = {
  isFetching: false,
  recalls: []
};
function recallsReducer(state, action) {
  switch (action.type) {
    case "FETCHING":
      return Object.assign({}, state, { isFetching: true });
    case "FETCHED_DATA":
      return Object.assign({}, state, {
        recalls: action.payload,
        isFetching: false
      });
    default:
      return state;
  }
}

export default recallsReducer;
