import React from "react";
import ReactDOM from "react-dom";
// import axios from "axios";
import "index.scss";
import Application from "components/Application";

const axios = require("axios").default


if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

//Inserts the application component after "root"
ReactDOM.render(<Application />, document.getElementById("root"));

