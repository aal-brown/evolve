import React, { useState, Fragment } from "react";
import "components/PageContent/Login.scss";
import axios from "axios";
import Button from "../Button"

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const url = "https://agile-scrubland-73485.herokuapp.com/sessions";

  let userData = {
  email: email,
  password: password,
}

  function login() {
    axios({
      method: 'POST',
      url,
      data: userData,
      mode: 'no-cors',
      headers: {
        // 'Access-Control-Allow-Origin': '*',
        // 'Accept': '*/*',
        'Content-Type': 'application/json'
        // 'User-Agent': 'axios'
      }
    })
    .then(resp => {
      console.log(resp);
      setError("")
      props.setCookie("user_id",resp.data)
      props.setView(4);
    })
    .catch(err => setError(err));
  }
  
  return (
    <Fragment>
      { error && <p className="alert alert-success">Your login credentials could not be verified, please try again. </p>}
      <div className="login-centered" >
    <section className="login" >
      <h1>Login</h1>
      <form className="login-form form-group" onSubmit={(event) => {event.preventDefault()}}>
        Email: <input className="form-control form-field form-text"
          onChange={(event) => {
            setEmail(event.target.value)}}
          value={email}
          type="email"
          placeholder="Enter Email"
          alt="email"
        />
        Password: <input className="form-control form-field form-text"
          onChange={(event) => {
            setPassword(event.target.value)}}
          value={password}
          label="Password: "
          type="password"
          placeholder="Enter Password"
          alt="password"
        />
      </form>
      </section>
      <div className="button-login">
      <Button className="button--confirm" onClick={login}>Login</Button>
      </div>
      </div>
   </Fragment>
  );
}