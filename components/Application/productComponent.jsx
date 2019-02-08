import React, { Component } from "react";
class ProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductId: 0,
      ProductName: "",
      Price: 0,
      CategoryName: "",
      Manufacturer: "",
      Products: [
        {
          ProductId: 101,
          ProductName: "Abc",
          Price: 2000,
          CategoryName: "Electronics",
          Manufacturer: "AB Tech"
        },
        {
          ProductId: 102,
          ProductName: "bef",
          Price: 1000,
          CategoryName: "Electrical",
          Manufacturer: "CD Power"
        }
      ],
      Categories: ["Electronics", "Electrical", "Food"],
      Manufacturers: ["AB Tech", "CD Power", "EF Beverages"],
      TableHeaders: [
        "ProductId",
        "ProductName",
        "Price",
        "CategoryName",
        "Manufacturer"
      ]
    };
  }

  // e is an event payload raised on target element
  // we can read the payload data using e
  onChangeProductId(e) {
    this.setState({
      ProductId: e.target.value
    });
  }
  onChangeProductName(e) {
    this.setState({
      ProductName: e.target.value
    });
  }
  onChangePrice(e) {
    this.setState({
      Price: e.target.value
    });
  }
  onChangeManufacturer(e) {
    this.setState({
      Manufacturer: e.target.value
    });
  }
  onChangeCategoryName(e) {
    this.setState({
      CategoryName: e.target.value
    });
  }
  onClickClear(e) {
    this.setState({
      Manufacturer: ""
    });
    this.setState({
      ProductId: 0
    });

    this.setState({
      ProductName: ""
    });
    this.setState({
      Price: 0
    });
    this.setState({
      onChangeManufacturer: ""
    });
  }

  onClickSave(e) {
    alert(
      `${this.state.ProductId}
      ${this.state.ProductName}
      ${this.state.Price}
      ${this.state.CategoryName}
      ${this.state.Manufacturer}`
    );

    // get thecopy of product arry using  slice
    let tempArray = this.state.Products.slice();

    tempArray.push({
      ProductId: this.state.ProductId,
      ProductName: this.state.ProductName,
      Price: this.state.Price,
      CategoryName: this.state.CategoryName,
      Manufacturer: this.state.Manufacturer
    });

    this.setState({ Products: tempArray });
  }

  getSelectedProduct(p) {
    this.setState({
      Manufacturer: p.Manufacturer
    });
    this.setState({
      ProductId: p.ProductId
    });

    this.setState({
      ProductName: p.ProductName
    });
    this.setState({
      Price: p.Price
    });
    this.setState({
      CategoryName: p.CategoryName
    });
  }

  render() {
    return (
      <div className="container">
        <div className="form-group">
          <label htmlFor="ProductId">ProductId</label>
          <input
            type="text"
            className="form-control"
            value={this.state.ProductId}
            onChange={this.onChangeProductId.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ProductName">ProductName</label>
          <input
            type="text"
            className="form-control"
            value={this.state.ProductName}
            onChange={this.onChangeProductName.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Price">Price</label>
          <input
            type="text"
            className="form-control"
            value={this.state.Price}
            onChange={this.onChangePrice.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Manufacturer">Manufacturer</label>
          <select
            type="text"
            className="form-control"
            value={this.state.Manufacturer}
            onChange={this.onChangeManufacturer.bind(this)}
          >
            {this.state.Manufacturers.map((c, i) => (
              <Options key={i} data={c} />
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="CategoryName">CategoryName</label>
          <select
            type="text"
            className="form-control"
            value={this.state.CategoryName}
            onChange={this.onChangeCategoryName.bind(this)}
          >
            {this.state.Categories.map((c, i) => (
              <Options key={i} data={c} />
            ))}
          </select>
        </div>
        <div className="form-group">
          <table className="table table-bordered table-stripped">
            <thead>
              <tr>
                {/* <th>ProductId</th>
                <th>ProductName</th>
                <th>Price</th>
                <th>CategoryName</th>
                <th>Manufacturer</th> */}
                {this.state.TableHeaders.map((header, i) => (
                  <TableTitle key={i} data={header} />
                ))}
              </tr>
            </thead>
            <tbody>
              {this.state.Products.map((prd, idx) => (
                <TableRow
                  key={idx}
                  row={prd}
                  selected={this.getSelectedProduct.bind(this)}
                />
              ))}
            </tbody>
            <tbody>
              <tr>
                <td>
                  <input
                    type="button"
                    value="New"
                    className="btn btn-default"
                    onClick={this.onClickClear.bind(this)}
                  />
                </td>
                <td>
                  <input
                    type="button"
                    value="Save"
                    className="btn btn-success"
                    onClick={this.onClickSave.bind(this)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

// Component to render Options
// The props.data is the data passed from the parent of this component
class Options extends Component {
  render() {
    return <option value={this.props.data}>{this.props.data}</option>;
  }
}

class TableTitle extends Component {
  render() {
    return <th value={this.props.data}>{this.props.data}</th>;
  }
}

class TableRow extends Component {
  constructor(props) {
    super(props);
  }

  onRowClick() {
    this.props.selected(this.props.row);
  }
  render() {
    return (
      <tr onClick={this.onRowClick.bind(this)}>
        <td>{this.props.row.ProductId}</td>
        <td>{this.props.row.ProductName}</td>
        <td>{this.props.row.Price}</td>
        <td>{this.props.row.CategoryName}</td>
        <td>{this.props.row.Manufacturer}</td>
      </tr>
    );
  }
}
export default ProductComponent;
