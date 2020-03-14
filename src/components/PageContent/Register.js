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

export default function Register() {
  return (
    <section>
      <p><h1>REGISTER</h1></p>
    </section>
  );
}