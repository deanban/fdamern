import React, { Component } from "react";
// import { connect } from "react-redux";
// import { fetchData } from "../actions/recallActions";

export default class RecallContainer extends Component {
  // componentDidMount() {
  //   this.props.fetchData();
  // }
  render() {
    console.log("recallcontainer", this.props.store.getState());
    return <div>works</div>;
  }
}

// function mapStateToProps(state) {
//   return {
//     data: state.recalls
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchData: () => {
//       dispatch(fetchData());
//     }
//   };
// }
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(RecallContainer);
