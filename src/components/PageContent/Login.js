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
      console.log(resp.data)
      props.setUser(resp.data.id)
      props.setView(4);
    })
    .catch(err => console.error(err.message));
  }
  
  return (
    <section className="login">
      <h1>Login</h1>
      <form className="login-form" onSubmit={(event) => {event.preventDefault()}}>
        Email: <input
          onChange={(event) => {
            setEmail(event.target.value)}}
          value={email}
          type="email"
          placeholder="Enter Email"
        />
        Password: <input
          onChange={(event) => {
            setPassword(event.target.value)}}
          value={password}
          label="Password: "
          type="password"
        />
      </form>
      <Button className="button--confirm" onClick={login}>Login</Button>
    </section>
  );
}