import React from "react";
import MyProfile from "./MyProfile";
import MyGames from "./MyGames";
import About from "./About";
import Guide from "./Guide";
import Game from "./Game";
import Login from "./Login";
import Register from "./Register";
import "./PageContent.scss"; 



export default function PageContent(props) {

  return (
    <section>
      { props.view === 1 && (
        <MyProfile
        />
      )}
      { props.view === 2 && (
        <MyGames
        cookies={props.cookies} //Will be an array of game objects
        />
      )}
      { props.view === 3 && (
        <About
        />
      )}
      { props.view === 4 && (
        <Guide
        cookies={props.cookies}
        />
      )}
      { props.view === 5 && (
        <Game
        />
      )}
      { props.view === 6 && (
        <Login
        setCookie={props.setCookie}
        setView={props.setView}
        />
      )}
      { props.view === 7 && (
        <Register
        setView = {props.setView}
        setCookie={props.setCookie}
        />
      )}
      { props.view === 8 && (
        <Login
        setView = {props.setView}
        setCookie={props.setCookie}
        />
      )}
    </section>
  );
}