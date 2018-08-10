import React, { Component } from "react";
import MapGL, { NavigationControl } from "react-map-gl";
// import Iconlayer from "./Iconlayer";
import Arclayer from "./Arclayer";
import Overlay from "./Overlay";

// const MAPBOX_STYLE = "mapbox://styles/mapbox/dark-v9";
const MAPBOX_STYLE = "mapbox://styles/deanb/cjk8l961f4bih2spdg98hlyat";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZGVhbmIiLCJhIjoiY2prMXc2aGo1MGx3aDNxb2dpOXg2a3A5MyJ9.-1wms63S3D4V0WFAerBKQQ";
const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: props.width || window.innerWidth,
        height: props.height || window.innerHeight,
        longitude: -100,
        latitude: 37.785164,
        zoom: 3.5,
        pitch: 60,
        maxZoom: 16
      },
      currentTime: 0,
      data: null
    };
    this._resize = this._resize.bind(this);
    this._animate = this._animate.bind(this);
    this._onViewportChange = this._onViewportChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this._resize);
    this._resize();
    this._animate();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._resize);
    window.cancelAnimationFrame(this._animation);
  }

  async getDummyData() {
    await fetch(
      "https://raw.githubusercontent.com/uber-common/deck.gl-data/master/website/bart-segments.json"
    )
      .then(resp => resp.json())
      .then(data => this.setState({ data }));
    //   .then(props => this._renderTooltip());
  }

  _onViewportChange(viewport) {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  }

  _resize() {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _animate() {
    this.setState({ currentTime: Date.now() });
    this._animation = window.requestAnimationFrame(this._animate);
  }

  render() {
    this.getDummyData();
    const { viewport } = this.state;

    return (
      <div>
        <MapGL
          {...viewport}
          mapStyle={MAPBOX_STYLE}
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          <div className="nav" style={navStyle}>
            <NavigationControl onViewportChange={this._onViewportChange} />
            <Overlay viewport={viewport} data={this.state.data} />
            {/* <Arclayer viewport={viewport} /> */}
          </div>
        </MapGL>
      </div>
    );
  }
}

// import React, { Component } from "react";
// import MapGL, { NavigationControl } from "react-map-gl";
// // import MapMarker from "./MapMarker";
// import Iconlayer from "./Iconlayer";
// import Arclayer from "./Arclayer";
// import Overlay from "./Overlay";

// const TOKEN =
//   "pk.eyJ1IjoiZGVhbmIiLCJhIjoiY2prMXc2aGo1MGx3aDNxb2dpOXg2a3A5MyJ9.-1wms63S3D4V0WFAerBKQQ";

// const navStyle = {
//   position: "absolute",
//   top: 0,
//   left: 0,
//   padding: "10px"
// };

// export default class MapContainer extends Component {
//   state = {
//     viewport: {
//       latitude: 37.785164,
//       longitude: -100,
//       zoom: 3.5,
//       bearing: 0,
//       pitch: 60,
//       width: 500,
//       height: 500
//     },
//     currentTime: null
//   };

//   componentDidMount() {
//     window.addEventListener("resize", this._resize);
//     this._resize();
//     this._animate();
//   }

//   componentWillUnmount() {
//     window.removeEventListener("resize", this._resize);
//     window.cancelAnimationFrame(this._animation);
//   }

//   _resize = () => {
//     this.setState({
//       viewport: {
//         ...this.state.viewport,
//         width: this.props.width || window.innerWidth,
//         height: this.props.height || window.innerHeight
//       }
//     });
//   };

//   _updateViewport = viewport => {
//     this.setState({ viewport });
//   };

//   _animate() {
//     this.setState({ currentTime: Date.now() });
//     this._animation = window.requestAnimationFrame(this._animate);
//   }

//   render() {
//     console.log("Map: ", this.props.store.getState());
//     return (
//       <MapGL
//         {...this.state.viewport}
//         mapStyle="mapbox://styles/deanb/cjk8l961f4bih2spdg98hlyat"
//         onViewportChange={this._updateViewport}
//         mapboxApiAccessToken={TOKEN}
//       >
//         <div className="nav" style={navStyle}>
//           <NavigationControl onViewportChange={this._updateViewport} />
//           {/* <Iconlayer viewport={this.state.viewport} /> */}
//           {/* <Arclayer viewport={this.state.viewport} /> */}
//           <Overlay viewport={this.state.viewport} />
//         </div>
//       </MapGL>
//     );
//   }
// }

// viewport: {
//   latitude: 37.785164,
//   longitude: -100,
//   zoom: 3.5,
//   bearing: 0,
//   pitch: 60,
//   width: 500,
//   height: 500
// }
