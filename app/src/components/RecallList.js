import React, { Component } from "react";
// import { connect } from "react-redux";
// import FilterRecalls from "./FilterRecalls";

export default class RecallList extends Component {
  renderList() {
    return this.props.current.map((recall, index) => {
      return (
        <div>
          <table>
            <tr>
              <th>State</th>
              {/* <td>{recall.state}</td> */}
              <th>City</th>
              {/* <td>{recall.city}</td> */}
              <th>Type</th>
              {/* <td>{recall.product_type}</td> */}
              <th>Reason for Recall</th>
              {/* <td>{recall.reason_for_recall}</td> */}
              <th>Status</th>
              {/* <td>{recall.status}</td> */}
            </tr>

            <tr>
              <td>{recall.state}</td>
              <td>{recall.city}</td>
              <td>{recall.product_type}</td>
              <td>{recall.reason_for_recall}</td>
              <td>{recall.status}</td>
            </tr>
          </table>
        </div>
      );
    });
  }
  render() {
    console.log("current display", this.props);
    return <div>{this.renderList()}</div>;
  }
}

// class RecallList extends Component {
//   filterRecalls = () => {
//     console.log("filtering recalls", this.props.data.recalls);
//     return (
//       <FilterRecalls
//         recalls={this.props.data.recalls}
//         searchTerm={this.props.searchTerm}
//       />
//     );
//   };

//   render() {
//     console.log("rendering RecallList");
//     // const recalls = this.props.data.recalls.map((index, data) => {
//     //   <FilterRecalls recalls={data} searchTerm={this.props.searchTerm} />;
//     // });
//     if (this.props.searchTerm) {
//       return <div>{() => this.filterRecalls()}</div>;
//     }
//   }
// }

// function mapStateToProps(state) {
//   return {
//     searchTerm: state.searchTerm,
//     data: state.data
//   };
// }

// export default connect(
//   mapStateToProps,
//   null
// )(RecallList);
