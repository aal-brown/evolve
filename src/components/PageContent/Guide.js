import React from "react";
import axios from "axios";
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

export default function Guide(props) {
  let user_id = props.cookies.user_id
  axios.get("http://localhost:3000/getuser", {
    headers: { "ID": user_id }
  })
  .then((res) => console.log(res.data)
  );
  return (
    <section className="pagetext">
      <p>{lorem.generateParagraphs(2)}</p>
    </section>
  );
}