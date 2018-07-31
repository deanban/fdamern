import React, { Component } from "react";

class FilterRecalls extends Component {
  renderRecalls = () => {
    if (!this.props.searchTerm) return <h1>Enter a city</h1>;

    const cities = this.props.recalls.filter(
      recall => recall.city === this.props.searchTerm
    );

    debugger;

    if (!cities) return <h1>Not Found</h1>;

    return cities.map((data, index) => {
      return (
        <table>
          <tbody>
            <tr>
              <td>1</td>
              <td>{data.status}</td>
              <td>{data.reason_for_recall}</td>
            </tr>
          </tbody>
        </table>
      );
    });
  };

  render() {
    return <div>{this.renderRecalls()}</div>;
  }
}

export default FilterRecalls;
