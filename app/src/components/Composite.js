import DeckGL, { CompositeLayer, ScatterplotLayer, ArcLayer } from "deck.gl";

export default class TaxiLayer extends CompositeLayer {
  renderLayers() {
    return [
      new ScatterplotLayer({
        id: "from",
        data: this.props.data,
        getPosition: this.props.getPickupLocation,
        getColor: d => this.props.pickupColor,
        radiusScale: 60
      }),
      new ScatterplotLayer({
        id: "to",
        data: this.props.data,
        getPosition: this.props.getDropoffLocation,
        getColor: d => this.props.dropoffColor,
        radiusScale: 60
      }),
      new ArcLayer({
        id: "arc",
        data: this.props.data,
        opacity: 0.3,
        getSourcePosition: this.props.getPickupLocation,
        getTargetPosition: this.props.getDropoffLocation,
        getSourceColor: d => this.props.pickupColor,
        getTargetColor: d => this.props.dropoffColor,
        strokeWidth: 2
      })
    ];
  }
}
