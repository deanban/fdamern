import DeckGL, { CompositeLayer, ScatterplotLayer, ArcLayer } from "deck.gl";

export default class Composite extends CompositeLayer {
  renderLayers() {
    // console.log("composite", this.props.data);
    return [
      new ScatterplotLayer({
        id: "from",
        data: this.props.data,
        getPosition: this.props.getPickupLocation,
        getColor: d => this.props.pickupColor,
        radiusScale: 80
      }),
      new ScatterplotLayer({
        id: "to",
        data: this.props.data,
        getPosition: this.props.getDropoffLocation,
        getColor: d => this.props.dropoffColor,
        radiusScale: 80
      }),
      new ArcLayer({
        id: "arc",
        data: this.props.data,
        opacity: 0.5,
        getSourcePosition: this.props.getPickupLocation,
        getTargetPosition: this.props.getDropoffLocation,
        getSourceColor: d => this.props.pickupColor,
        getTargetColor: d => this.props.dropoffColor,
        strokeWidth: 2
      })
    ];
  }
}
