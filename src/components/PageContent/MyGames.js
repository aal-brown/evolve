import React, { useState, useEffect } from "react";
import MyGamesItem from "./MyGamesItem";
import Button from "../Button";
import Game from "./Game";
import axios from "axios";
import "./MyGames.scss"
/* import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
}); */

// Games will be received from the database, sorted by user id.

export default function MyGames(props) {
  const [gameView, setGameView] = useState(0)
  const [games, setGames] = useState([])
  props.removeCookie('game_id')
  let user_id = props.cookies.user_id

  function getData() {
    axios.get("http://localhost:3000/getuser", {
      headers: { "ID": user_id }
    })
    .then((res) => {
      axios.get("http://localhost:3000/games", {
        headers: { "ID": res.data.id }
      })
      .then((res) => setGames(res.data));
    })
  }

  function setGameCookie(name) {
    const user_id = props.cookies.user_id;
    const url = "http://localhost:3000/games";

    axios.get("http://localhost:3000/getuser", {
      headers: { "ID": user_id }
    })
    .then((res) => {
      axios({
        method: 'POST',
        url,
        data: {
          user_id: res.data.id,
          name: name
        },
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
        props.setCookie("game_id", resp.data.id)
        setGameView(1);
      })
      .catch(err => console.error(err.message));
    })
  }

  function newGame() {
    console.log("LOADING NEW GAME");
    if (user_id) {
      setGameCookie("game name");
    } else {
      console.log("no user id")
      setGameView(1);
    }
    
    console.log("Is it waiting?")
  }

  function confirmQuit() {
    let x = document.getElementsByClassName('quit-confirm')[0];
    if (x.style.visibility === "hidden") {
      x.style.visibility = "visible";
    } else if (x.style.visibility === "visible") {
      x.style.visibility = "hidden";
    }
  }

  function exit() {
    setGameView(0);
    props.removeCookie("game_id");
  }

  function deleteGame() {
    console.log("Delete");
  }

  useEffect(() => {
    if(props.cookies.user_id){
      getData()
    }
  }, [props.cookies.user_id]);

  let myGames = games.map((game) => {
    
    return (
      <MyGamesItem
        key={game.id}
        img={game.screen_capture}
        created_at={game.created_at}
        updated_at={game.updated_at}
        age={game.playtime} //
        name={game.name}
        orgs={game.num_of_orgs}
        high_score={game.highest_score}
        // selected={game.name === props.game} hover will be used instead
        load={() => {
          console.log("LOADING GAME:", game.id);
          props.setCookie("game_id", game.id);
          setGameView(1);
        }} //This is a function to start the game
        delete={deleteGame} //This will prompt for whether the user wants to delete that game
        />
    );
  });

  return(
    <section>
    { gameView === 0 && (
      <div className="default-game-page">
        <div className="game-buttons">
          <Button className="button--confirm" onClick={newGame} >New Game</Button>
        </div>
        <div className="MyGames">
          <h1>Saved Games:</h1>
          {myGames}
          { myGames.length === 0 && !user_id && (
            <h2>You must log in to see your saved games</h2>
          )}
        </div>
      </div>
    )}
    { gameView === 1 && (
      <div className="gameCanvas">
        <div className="quit-confirm" style={{visibility: "hidden"}}>
          <h1>Quit?</h1>
          <h2>All unsaved changes will be lost!</h2>
          <div className="quit-confirm-buttons">
            <Button className="button--confirm" onClick={exit} >Quit</Button>
            <Button className="button--confirm" onClick={confirmQuit} >Cancel</Button>
          </div>
        </div>
        <div className="">
          <Button className="button--confirm" onClick={confirmQuit} >Quit</Button>
        </div>
        <Game
        />
      </div>
    )}
    </section>
  );
  
}