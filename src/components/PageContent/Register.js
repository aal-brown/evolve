import React, { useState } from "react";
import "components/PageContent/Login.scss";
import Button from "../Button"

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function register() {
    console.log("AGAHAGAHGA: ", name, email, username, password, passwordConfirm)
  }
  return (
    <section className="login">
      <h1>Register</h1>
      <form className="login-form" onSubmit={(event) => {event.preventDefault()}}>
        Name: <input
          onChange={(event) => {
            setName(event.target.value)}}
          value={name}
          type="text"
        />
        Email: <input
          onChange={(event) => {
            setEmail(event.target.value)}}
          value={email}
          type="email"
        />
        Username: <input
          onChange={(event) => {
            setUsername(event.target.value)}}
          value={username}
          type="text"
        />
        Password: <input
          onChange={(event) => {
            setPassword(event.target.value)}}
          value={password}
          type="password"
        />
        Confirm Password: <input
          onChange={(event) => {
            setPasswordConfirm(event.target.value)}}
          value={passwordConfirm}
          type="password"
        />
      </form>
      <Button className="button--confirm" onClick={register}>Register</Button>
    </section>
  );
}