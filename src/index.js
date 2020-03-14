import React from "react";
import ReactDOM from "react-dom";
// import axios from "axios";
import "index.scss";

const axios = require("axios").default



import Application from "components/Application";

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

//Inserts the application component after "root"
ReactDOM.render(<Application />, document.getElementById("root"));

