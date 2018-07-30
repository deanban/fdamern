function searchReducer(state = { searchTerm: "" }, action) {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      console.log("hit search reducer");
      return Object.assign({}, state, {
        searchTerm: action.payload
      });
    default:
      return state;
  }
}

export default searchReducer;
