import _ from "lodash";

function recallsReducer(state = { isFetching: false, recalls: [] }, action) {
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
    default:
      return state;
  }
}

export default recallsReducer;
