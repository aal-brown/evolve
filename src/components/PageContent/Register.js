import React, { useState, Fragment } from "react";
import "components/PageContent/Login.scss";
import Button from "../Button";
import axios from "axios";
import "./Register.scss"

export default function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

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
    .catch(err => setError(err));
  
  }
  return (
    <Fragment>
      { error && <p className="alert alert-success"> The following error(s) prevented an account from being created:
  {error.response.data.name && <li>Name can't be blank</li>}
  {error.response.data.email && <li>Email can't be blank or belong to an existing user </li>}
  {error.response.data.username && <li>Username can't be blank or belong to an existing user</li>}
  {error.response.data.password && <li>Passwords can't be blank or fewer than 5 characters</li>}
  {error.response.data.password_confirmation.includes("doesn't match Password") && <li>Passwords must match</li>}
      </p>}
    <section className="login">
      <h1 className="register-text">Register</h1>
      <form className="login-form form-group" onSubmit={(event) => {event.preventDefault()}}>
        Name: <input className="form-control form-field form-text"
          onChange={(event) => {
            setName(event.target.value)
          }}
          value={name}
          type="text"
          placeholder="Enter Name"
          alt="name"
        />
        Email: <input className="form-control form-field form-text"
          onChange={(event) => {
            setEmail(event.target.value)
          }}
          value={email}
          type="email"
          placeholder="Enter Email"
          alt="email"
        />
        Username: <input className="form-control form-field form-text"
          onChange={(event) => {
            setUsername(event.target.value)}}
          value={username}
          type="text"
          placeholder="Enter Username"
          alt="username"
        />
        Password: <input className="form-control form-field form-text"
          onChange={(event) => {
            setPassword(event.target.value)
          }}
          value={password}
          type="password"
          placeholder="Enter Password"
          alt="password"

        />
        Confirm Password: <input className="form-control form-field form-text"
          onChange={(event) => {
            setPasswordConfirm(event.target.value)
          }}
          value={passwordConfirm}
          type="password"
          placeholder="Confirm Password"
          alt="confirm-password"

        />
      </form>
    </section>
    <div className="button-login">
      <Button className="button--confirm" onClick={createUser}>Register</Button>
      </div>
    </Fragment>
  );
}