import React from "react";
import MyProfile from "./MyProfile";
import MyGames from "./MyGames";
import About from "./About";
import Guide from "./Guide";
import Game from "./Game";
import Login from "./Login";
import Register from "./Register";
import "./PageContent.scss"; 
import { tsPropertySignature } from "@babel/types";


export default function PageContent(props) {

  return (
    <section>
      { props.view === 1 && (
        <MyProfile
        user={props.user}
        />
      )}
      { props.view === 2 && (
        <MyGames
          user={props.user}
          games={props.games} //Will be an array of game objects
        />
      )}
      { props.view === 3 && (
        <About
        />
      )}
      { props.view === 4 && (
        <Guide
        />
      )}
      { props.view === 5 && (
        <Game
        user={props.user}
        />
      )}
      { props.view === 6 && (
        <Login
        setUser={props.setUser}
        setView={props.setView}
        />
      )}
      { props.view === 7 && (
        <Register
        setView = {props.setView}
        setUser={props.setUser}
        />
      )}
    </section>
  );
}