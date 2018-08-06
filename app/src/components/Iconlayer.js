import React, { Component } from "react";
import DeckGL, { IconLayer } from "deck.gl";

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

  async getDummyData() {
    await fetch(
      "https://raw.githubusercontent.com/uber-common/deck.gl-data/master/website/bart-segments.json"
    )
      .then(resp => resp.json())
      .then(data => this.setState({ data }));
    //   .then(props => this._renderTooltip());
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
              .map((str, i) => <p key={i}>{str}</p>)}
          </div>
        )
      );
    }
    return null;
  }

  render() {
    this.getDummyData();
    // this._renderTooltip();

    console.log("iconlayer", this.state.data);
    const layer = new IconLayer({
      id: "icon-layer",
      data: this.state.data,
      pickable: true,
      iconAtlas: "http://deck.gl/images/icon-atlas.png",
      iconMapping: {
        marker: {
          x: 0,
          y: 0,
          width: 128,
          height: 128,
          anchorY: 128,
          mask: true
        }
      },
      sizeScale: 15,
      getPosition: d => d.from.coordinates,
      getIcon: d => "marker",
      getSize: d => 3,
      getColor: d => [Math.sqrt(d.inbound), 140, 0],
      onHover: ({ object }) => this.setTooltip(`${object.from.name}`)
    });

    return (
      <DeckGL
        {...this.props.viewport}
        layers={[layer]}
        setTooltip={this.setTooltip.bind(this)}
      />
    );
  }
}
