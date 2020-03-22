import React, { useState } from "react";
import "components/PageContent/Login.scss";
import Button from "../Button";
import axios from "axios";

export default function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

const url = "https://agile-scrubland-73485.herokuapp.com/users";

let userData = {
  name: name,
  email: email,
  username: username,
  password: password,
  password_confirmation: passwordConfirm
}

  function createUser() {
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
      props.setCookie("user_id", resp.data)
      props.setView(4);
    })
    .catch(err => console.error(err.message));
  }
  return (
    <section className="login">
      <h1>Register</h1>
      <form className="login-form form-group" onSubmit={(event) => {event.preventDefault()}}>
        Name: <input className="form-control form-field"
          onChange={(event) => {
            setName(event.target.value)
          }}
          value={name}
          type="text"
          placeholder="Enter Name"
        />
        Email: <input className="form-control form-field"
          onChange={(event) => {
            setEmail(event.target.value)
          }}
          value={email}
          type="email"
          placeholder="Enter Email"
        />
        Username: <input className="form-control form-field"
          onChange={(event) => {
            setUsername(event.target.value)}}
          value={username}
          type="text"
          placeholder="Enter Username"

        />
        Password: <input className="form-control form-field"
          onChange={(event) => {
            setPassword(event.target.value)
          }}
          value={password}
          type="password"
          placeholder="Enter Password"

        />
        Confirm Password: <input className="form-control form-field"
          onChange={(event) => {
            setPasswordConfirm(event.target.value)
          }}
          value={passwordConfirm}
          type="password"
          placeholder="Confirm Password"

        />
      </form>
      <Button className="button--confirm" onClick={createUser}>Register</Button>
    </section>
  );
}