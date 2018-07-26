import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import RecallContainer from "./components/RecallContainer";
// import ReactMapGL from "react-map-gl";
import { fetchData } from "./actions/recallActions";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    console.log("appstate ", this.props.store.getState());
    return (
      <div className="App">
        <RecallContainer store={this.props.store} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    recalls: state.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => {
      dispatch(fetchData());
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
