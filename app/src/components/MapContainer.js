import React, { Component } from "react";
import MapGL, { NavigationControl } from "react-map-gl";
// import MapMarker from "./MapMarker";
import Iconlayer from "./Iconlayer";
import Arclayer from "./Arclayer";

const TOKEN =
  "pk.eyJ1IjoiZGVhbmIiLCJhIjoiY2prMXc2aGo1MGx3aDNxb2dpOXg2a3A5MyJ9.-1wms63S3D4V0WFAerBKQQ";

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

export default class MapContainer extends Component {
  state = {
    viewport: {
      latitude: 37.785164,
      longitude: -100,
      zoom: 3.5,
      bearing: 0,
      pitch: 50,
      width: 500,
      height: 500
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      }
    });
  };

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  render() {
    console.log("Map: ", this.props.store.getState());
    return (
      <MapGL
        {...this.state.viewport}
        mapStyle="mapbox://styles/deanb/cjk8l961f4bih2spdg98hlyat"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN}
      >
        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
          {/* <Iconlayer viewport={this.state.viewport} /> */}
          <Arclayer viewport={this.state.viewport} />
        </div>
      </MapGL>
    );
  }
}
