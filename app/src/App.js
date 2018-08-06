import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import RecallContainer from "./components/RecallContainer";
// import ReactMapGL from "react-map-gl";
import MapContainer from "./components/MapContainer";
// import Search from "./components/Search";
import { fetchData } from "./actions/recallActions";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    console.log("appstate ", this.props.recalls);
    return (
      <div className="App">
        <MapContainer store={this.props.store} />
        {/* <Search /> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log("appmapstate", state);
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
