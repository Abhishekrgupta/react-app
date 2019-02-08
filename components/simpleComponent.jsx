import React, { Component } from "react";
class SimpleComponent extends Component {
  // to control state definition and to accept data from parent component.
  // props represents data to be received from parent component
  constructor(props) {
    super(props);

    // state declaration
    // event-binding to component
    this.state = {};
  }

  // It encapsulates DO and its Data with behavior
  // This returns the DOM Object aka "Virtual DOM"
  render() {
    return (
      // Must have only one parent element
      <div>
        <div>
          <h2>Simple React Component {this.props.myname}</h2>
        </div>
        {/* <ul>
          <li>Coffee</li>
          <li>Tea</li>
          <li>Milk</li>
        </ul> */}
        <hr />
        <div>
          <NewComponent age="123" />
        </div>
      </div>
    );
  }
}

class NewComponent extends Component {
  render() {
    return (
      <div>
        <h2>The New Component {this.props.age}</h2>
      </div>
    );
  }
}

export default SimpleComponent;
