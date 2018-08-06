import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import RecallList from "./RecallList";

import { setSearchTerm } from "../actions/searchAction";

class Search extends Component {
  state = {
    searchStr: "",
    currentDisplay: this.props.data.recalls,
    selected: "location",
    sortBy: "status"
  };

  handleChange(event) {
    let newDisplay;

    switch (this.state.selected) {
      case "location":
        newDisplay = this.props.data.recalls.filter(recall => {
          return (
            recall.city
              .toLowerCase()
              .includes(event.target.value.toLowerCase()) ||
            recall.state
              .toLowerCase()
              .includes(event.target.value.toLowerCase())
          );
        });
        break;
      case "product":
        newDisplay = this.props.data.recalls.filter(recall => {
          return recall.product_description
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        });
    }

    newDisplay.sort(recall => (recall.status === "Terminated" ? 1 : -1));

    newDisplay.sort((a, b) =>
      a[this.state.sortBy].localeCompare(b[this.state.sortBy])
    );

    console.log("newlyDisplayed", newDisplay);

    this.setState(
      {
        searchStr: event.target.value,
        currentDisplay: newDisplay
        // recalls: this.props.data.recalls
      },
      () => {
        this.props.setSearchTerm(this.state.searchStr);
      }
    );
  }

  handleSelect = e => {
    this.setState({
      selected: e.target.value
    });
  };

  setPlaceholderText() {
    switch (this.state.selected) {
      case "location":
        return "Please Enter a City or State";
      case "product":
        return "Please Enter a Product";
    }
  }

  sortBy = val => {
    this.setState({
      sortBy: val
    });
  };

  render() {
    console.log("search ", this.state);
    return (
      <div>
        <div className="dropdown">
          Search By:
          <select value={this.state.selected} onChange={this.handleSelect}>
            <option value="location">Location</option>
            <option value="product">Product Description</option>
          </select>
        </div>
        <div className="input-wrapper">
          <input
            onChange={event => this.handleChange(event)}
            placeholder={this.setPlaceholderText()}
            value={this.state.searchStr}
            spellCheck={false}
          />
          <span className="input-highlight">
            {this.state.searchStr.replace(/ /g, "\u00a0")}
          </span>
        </div>
        {this.state.searchStr.length ? (
          <RecallList
            current={this.state.currentDisplay}
            sortBy={this.sortBy}
          />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data
  };
}

function mapDispatchToProps(dispatch) {
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
