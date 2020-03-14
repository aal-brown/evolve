import React from "react";
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

export default function MyGames() {
  return (
    <section>
      <p><h1>MY GAMES</h1></p>
    </section>
  );
}