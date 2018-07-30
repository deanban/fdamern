export function setSearchTerm(term) {
  console.log("in search action");
  return {
    type: "SET_SEARCH_TERM",
    payload: term
  };
}
