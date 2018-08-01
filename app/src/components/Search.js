import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import RecallList from "./RecallList";

import { setSearchTerm } from "../actions/searchAction";

class Search extends Component {
  state = {
    searchStr: "",
    currentDisplay: this.props.data.recalls
    // recalls: []
  };

  handleChange(event) {
    // console.log("handle change", this.props.data.recalls);

    // let newlyDisplayed = _.filter(
    //   this.props.data.recalls,
    //   recall =>
    //     recall.city.includes(event.target.value.toLowerCase()) ||
    //     recall.state.includes(event.target.value.toUpperCase())
    // );

    let newlyDisplayed = [
      ...this.props.data.recalls.filter(recall =>
        recall.city.toLowerCase().includes(event.target.value.toLowerCase())
      ),
      ...this.props.data.recalls.filter(recall =>
        recall.state.toLowerCase().includes(event.target.value.toLowerCase())
      )
    ].sort(recall => (recall.status === "Terminated" ? 1 : -1));

    // newlyDisplayed.sort(recall => (recall.status === "Terminated" ? 1 : -1));

    console.log("newlyDisplayed", newlyDisplayed);

    this.setState(
      {
        searchStr: event.target.value,
        currentDisplay: newlyDisplayed
        // recalls: this.props.data.recalls
      },
      () => {
        this.props.setSearchTerm(this.state.searchStr);
      }
    );
  }

  render() {
    console.log("search ", this.state);
    return (
      <div>
        <div className="input-wrapper">
          <input
            onChange={event => this.handleChange(event)}
            placeholder="Please Enter a City or State"
            value={this.state.searchStr}
            spellCheck={false}
          />
          <span className="input-highlight">
            {this.state.searchStr.replace(/ /g, "\u00a0")}
          </span>
        </div>
        {this.state.searchStr.length ? (
          <RecallList current={this.state.currentDisplay} />
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
