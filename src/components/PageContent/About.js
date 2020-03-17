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

export default function About() {
  return (
    <section className="pagetext">
      <p>{lorem.generateParagraphs(2)}</p>
    </section>
  );
}