import React from "react";
import MyGamesItem from "MyGamesItem"
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
  let games = props.games.map((game) => {
    return (
      <MyGamesItem
        key={game.id}
        img={game.img}
        created_at={game.created_at}
        updated_at={game.updated_at}
        age={game.age} //
        name={game.name}
        orgs={game.orgs}
        high_score={game.high_score}
        // selected={game.name === props.game} hover will be used instead
        load={game.load} //This is a function to start the game
        delete={game.delete} //This will prompt for whether the user wants to delete that game
        />
    );
  });
  return games;
}