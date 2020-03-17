import React, { useState } from "react";
import "components/PageContent/Login.scss";
import axios from "axios";
import Button from "../Button"

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const url = "http://localhost:3000/sessions";

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
      props.setCookie("user_id",resp.data)
      props.setView(4);
    })
    .catch(err => console.error(err.message));
  }
  
  return (
    <section className="login">
      <h1>Login</h1>
      <form className="login-form form-group" onSubmit={(event) => {event.preventDefault()}}>
        Email: <input className="form-control form-field"
          onChange={(event) => {
            setEmail(event.target.value)}}
          value={email}
          type="email"
          placeholder="Enter Email"
        />
        Password: <input className="form-control form-field"
          onChange={(event) => {
            setPassword(event.target.value)}}
          value={password}
          label="Password: "
          type="password"
          placeholder="Enter Password"
        />
      </form>
      <Button className="button--confirm" onClick={login}>Login</Button>
    </section>
  );
}