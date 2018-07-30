import React, { Component } from "react";
import { connect } from "react-redux";

import { setSearchTerm } from "../actions/searchAction";

class Search extends Component {
  state = {
    searchStr: "",
    recalls: []
  };

  handleChange(event) {
    this.setState(
      {
        searchStr: event.target.value,
        recalls: this.props.data.recalls
      },
      () => {
        this.props.setSearchTerm(this.state.searchStr);
      }
    );
  }

  render() {
    console.log("search ", this.state);
    return (
      <input
        type="text"
        placeholder="enter state or city"
        onChange={event => this.handleChange(event)}
        value={this.state.searchStr}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data
  };
}

function mapDispatchToProps(dispatch, state) {
  return {
    setSearchTerm: searchTrm => {
      dispatch(setSearchTerm(searchTrm));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
