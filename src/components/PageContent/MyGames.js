import React, { useState, useEffect } from "react";
import MyGamesItem from "./MyGamesItem";
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
const [games, setGames] = useState([])
  let user_id = props.cookies.user_id
  console.log(user_id)
  let gamesData;

  function getData() {
    
      axios.get("http://localhost:3000/getuser", {
        headers: { "ID": user_id }
      })
      .then((res) => {
        axios.get("http://localhost:3000/gamedata", {
          headers: { "ID": res.data.id }
        })
        .then((res) => setGames(res.data));
      })
   
  }


  function load() {
    console.log("Load");
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
        img={game.img}
        created_at={game.created_at}
        updated_at={game.updated_at}
        age={game.playtime} //
        name={game.name}
        orgs={game.orgs}
        high_score={game.high_score}
        // selected={game.name === props.game} hover will be used instead
        load={load} //This is a function to start the game
        delete={deleteGame} //This will prompt for whether the user wants to delete that game
        />
    );
  });
  return <div className="MyGames">
          {myGames}
         </div>;
}