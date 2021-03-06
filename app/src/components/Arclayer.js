import React, { Component } from "react";
import DeckGL, { ArcLayer } from "deck.gl";
import jsondata from "../../src/geo.json";

const tooltipStyle = {
  position: "absolute",
  padding: "4px",
  background: "rgba(0, 0, 0, 0.8)",
  color: "#fff",
  maxWidth: "300px",
  fontSize: "10px",
  zIndex: 9,
  pointerEvents: "none"
};

export default class Iconlayer extends Component {
  state = {
    viewport: {
      ...this.props.viewport,
      width: 0,
      height: 0
    },
    data: null,
    tooltip: null
  };

  async _getData() {
    await fetch(
      "https://raw.githubusercontent.com/deanban/fdamern/master/geo.json"
    )
      .then(resp => resp.json())
      .then(data => this.setState({ data }));
  }

  setTooltip(x, y, object) {
    this.setState({ x, y, tooltip: object });
  }

  _renderTooltip() {
    const { x, y, tooltip } = this.state;
    if (tooltip) {
      return (
        tooltip && (
          <div style={{ ...tooltipStyle, top: y, left: x }}>
            {tooltip
              .toString()
              .split("\n")
              .map((str, i) => (
                <p key={i}>{str}</p>
              ))}
          </div>
        )
      );
    }
    return null;
  }

  render() {
    this._getData();
    // DATA_ARR.map(d => d.map(t => console.log(t)));
    // console.log("arc", this.state.data);
    this._renderTooltip();
    const layer = new ArcLayer({
      id: "arc-layer",
      data: this.state.data,
      opacity: 0.5,
      pickable: true,
      getStrokeWidth: 2,
      getSourcePosition: d => d.from.coordinates,
      getTargetPosition: d => d.to.coordinates,
      getSourceColor: d => [0, 128, 255],
      getTargetColor: d => [255, 0, 128]
      //   onHover: ({ object }) =>
      // this.setTooltip(`${object.from.name} to ${object.to.name}`)
    });

    return (
      <DeckGL
        {...this.props.viewport}
        layers={[layer]}
        setTooltip={this.setTooltip}
      />
    );
  }
}
