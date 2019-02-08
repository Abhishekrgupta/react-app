// import React OM
import React from "react";
//import ReactDOM to render Component in DOM
import ReactDOM from "react-dom";
import "!style!css!bootstrap/dist/css/bootstrap.min.css";
import SimpleComponent from "./components/simpleComponent.jsx";
import ProductUIComponent from "./components/Application/productUIComponent.jsx";

ReactDOM.render(<ProductUIComponent />, document.getElementById("app"));
