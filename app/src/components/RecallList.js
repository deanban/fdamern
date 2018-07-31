import React, { Component } from "react";
// import { connect } from "react-redux";
// import FilterRecalls from "./FilterRecalls";

export default class RecallList extends Component {
  renderList() {
    return this.props.current.map((recall, index) => {
      return (
        <div className="card">
          <table>
            <tbody>
              <tr className="container">
                {/* <td>{recall.status}</td> */}
                <td>{recall.reason_for_recall}</td>
              </tr>
            </tbody>
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
