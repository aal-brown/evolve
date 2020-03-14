import React, { useState } from "react";
import "components/PageContent/Login.scss";
import Button from "../Button"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    console.log("AGAHAGAHGA: ", email, password)
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