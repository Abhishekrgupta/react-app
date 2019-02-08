import React, { Component } from "react";
import ProductService from "./../../service/service";
class ProductUIComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Product_id: 0,
      ProductName: "",
      Price: 0,
      CategoryName: "",
      Manufacturer: "",
      Products: [
        {
          Product_id: 101,
          ProductName: "Abc",
          Price: 2000,
          CategoryName: "Electronics",
          Manufacturer: "AB Tech"
        },
        {
          Product_id: 102,
          ProductName: "bef",
          Price: 1000,
          CategoryName: "Electrical",
          Manufacturer: "CD Power"
        }
      ],
      Categories: ["Electronics", "Electrical", "Food"],
      Manufacturers: ["AB Tech", "CD Power", "EF Beverages"],
      TableHeaders: [
        "Product_id",
        "ProductName",
        "Price",
        "CategoryName",
        "Manufacturer"
      ],
      CriteriaName: "",
      Criteria: [
        "Product_id",
        "ProductName",
        "Price",
        "CategoryName",
        "Manufacturer"
      ]
    };

    this.serv = new ProductService();
  }

  // e is an event payload raised on target element
  // we can read the payload data using e
  onChangeProduct(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onChangeCriteria(e) {
    this.setState(
      { CriteriaName: e.target.value }
      // console.log({Criteria: e.target.value})
    );
  }
  onChangeSort(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onChangeReverse(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onClickSort(e) {
    let temp = this.state.Products;
    let criteriaType = this.state.CriteriaName;

    temp.sort(function(a, b) {
      if (typeof a[criteriaType] == "string") {
        return a[criteriaType]
          .toLowerCase()
          .localeCompare(b[criteriaType].toLowerCase());
      } else {
        return a[criteriaType] - b[criteriaType];
      }
    });
    this.setState({ Products: temp });
  }
  onClickReverse(e) {
    let temp = this.state.Products;
    let criteriaType = this.state.CriteriaName;

    temp.reverse();
    this.setState({ Products: temp });
  }

  onClickDelete(e) {
    alert(`Record Deleted Success ! \n
    ${this.state.Product_id}
    ${this.state.ProductName}
    ${this.state.Price}
    ${this.state.CategoryName}
    ${this.state.Manufacturer}
    `);

    let id = this.state.Product_id;

    this.serv
      .deleteData(id)
      .then(res => res.json())
      .then(resp => {
        console.log(`Resp data ${resp.data}`);
        let tempArray = this.state.Products.slice();
        tempArray.push(resp.data);
        this.setState({ Products: tempArray });
      })
      .catch(error => console.log(error.status));
  }

  onClickUpdate(e) {
    alert(`Record Updated Success ! \n
    ${this.state.Product_id}
    ${this.state.ProductName}
    ${this.state.Price}
    ${this.state.CategoryName}
    ${this.state.Manufacturer}
    `);

    let id = this.state.Product_id;

    let prd = {
      Product_id: this.state.Product_id,
      ProductName: this.state.ProductName,
      Price: this.state.Price,
      CategoryName: this.state.CategoryName,
      Manufacturer: this.state.Manufacturer
    };

    console.log("ProductUIComponent Updated " + JSON.stringify(prd));

    this.serv
      .putData(id, prd)
      .then(res => res.json())
      .then(resp => {
        console.log(`Resp data ${resp.data}`);
        let tempArray = this.state.Products.slice();
        tempArray.push(resp.data);
        this.setState({ Products: tempArray });
      })
      .catch(error => console.log(error.status));
  }

  // onChangeProductName(e) {
  //   this.setState({
  //     ProductName: e.target.value
  //   });
  // }
  // onChangePrice(e) {
  //   this.setState({
  //     Price: e.target.value
  //   });
  // }
  // onChangeManufacturer(e) {
  //   this.setState({
  //     Manufacturer: e.target.value
  //   });
  // }
  // onChangeCategoryName(e) {
  //   this.setState({
  //     CategoryName: e.target.value
  //   });
  // }
  onClickClear(e) {
    this.setState({
      Manufacturer: ""
    });
    this.setState({
      Product_id: 0
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
      `${this.state.Product_id}
      ${this.state.ProductName}
      ${this.state.Price}
      ${this.state.CategoryName}
      ${this.state.Manufacturer}`
    );

    // get thecopy of product arry using  slice
    // let tempArray = this.state.Products.slice();

    // tempArray.push({
    //   ProductId: this.state.ProductId,
    //   ProductName: this.state.ProductName,
    //   Price: this.state.Price,
    //   CategoryName: this.state.CategoryName,
    //   Manufacturer: this.state.Manufacturer
    // });

    // this.setState({ Products: tempArray });

    let prd = {
      Product_id: this.state.Product_id,
      ProductName: this.state.ProductName,
      Price: this.state.Price,
      CategoryName: this.state.CategoryName,
      Manufacturer: this.state.Manufacturer
    };

    this.serv
      .postData(prd)
      .then(res => res.json())
      .then(resp => resp.data)
      .catch(error => console.log(error.status));
  }

  getSelectedProduct(p) {
    this.setState({
      Manufacturer: p.Manufacturer
    });
    this.setState({
      Product_id: p.Product_id
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

  // method wil execute immediately after the render() complete its job
  componentDidMount() {
    let prds = this.serv
      .getData()
      .then(data => data.json())
      .then(value => {
        let serverProducts = value.data;
        let tempProducts = [];
        for (let i = 0; i < serverProducts.length; i++) {
          let prod = {
            Product_id: serverProducts[i].Product_id,
            ProductName: serverProducts[i].ProductName,
            Price: serverProducts[i].Price,
            CategoryName: serverProducts[i].CategoryName,
            Manufacturer: serverProducts[i].Manufacturer
          };
          tempProducts.push(prod);
        }
        this.setState({ Products: tempProducts });
        console.log(serverProducts[0]);

        //console.log(JSON.stringify(value));
      })
      .catch(err => {
        console.log(`Error Ocurred ${error.status}`);
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
            value={this.state.Product_id}
            name="Product_id"
            onChange={this.onChangeProduct.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ProductName">ProductName</label>
          <input
            type="text"
            className="form-control"
            value={this.state.ProductName}
            name="ProductName"
            onChange={this.onChangeProduct.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Price">Price</label>
          <input
            type="text"
            className="form-control"
            value={this.state.Price}
            name="Price"
            onChange={this.onChangeProduct.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Manufacturer">Manufacturer</label>
          <select
            type="text"
            className="form-control"
            value={this.state.Manufacturer}
            name="Manufacturer"
            onChange={this.onChangeProduct.bind(this)}
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
            name="CategoryName"
            onChange={this.onChangeProduct.bind(this)}
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

                <td>
                  <input
                    type="button"
                    value="Delete"
                    className="btn btn-danger"
                    onClick={this.onClickDelete.bind(this)}
                  />
                </td>
                <td>
                  <input
                    type="button"
                    value="Update"
                    className="btn btn-warning"
                    onClick={this.onClickUpdate.bind(this)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <h3>
                    <label htmlFor="Criteria">Criteria</label>
                  </h3>
                  <select
                    className="form-control"
                    value={this.state.CriteriaName}
                    onChange={this.onChangeCriteria.bind(this)}
                    name="Criteria"
                  >
                    {this.state.Criteria.map((m, i) => (
                      <Options key={i} data={m} />
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="radio-inline">
                    <label className="label label-lg">
                      <input
                        type="radio"
                        name="radiobtn"
                        value="SORT"
                        onChange={this.onChangeSort.bind(this)}
                        onClick={this.onClickSort.bind(this)}
                      />{" "}
                      SORT
                    </label>
                  </div>
                </td>
                <td>
                  <div className="radio-inline">
                    <label>
                      <input
                        type="radio"
                        name="radiobtn"
                        value="REVERSE"
                        onChange={this.onChangeReverse.bind(this)}
                        onClick={this.onClickReverse.bind(this)}
                      />{" "}
                      REVERSE
                    </label>
                  </div>
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
        <td>{this.props.row.Product_id}</td>
        <td>{this.props.row.ProductName}</td>
        <td>{this.props.row.Price}</td>
        <td>{this.props.row.CategoryName}</td>
        <td>{this.props.row.Manufacturer}</td>
      </tr>
    );
  }
}
export default ProductUIComponent;
