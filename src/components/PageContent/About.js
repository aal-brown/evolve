import React from "react";
import "./Guide.scss";

export default function About() {
  return (
    <section>
     <h1 className="guide-welcome-text">Welcome to Evolve!</h1>
     <h2 className="about-text">It's survival of the fittest! Evolve is a game that simulates the processes of evolution and natural selection, allowing you to manipulate environmental variables and observe your organisms reproduce and change over time! This whole website was built in two weeks by Adlai Brown, Lucy Midgley, and Noah Dumba as a final project for the Lighthouse Labs Web Development Bootcamp.</h2>
     <h2 className="about-text">If you would like to contact us or view our other projects you can find our LinkedIn pages by following the links below!</h2>
     <h2 className="about-links">
      <a className="link" href="https://www.linkedin.com/in/adlai-brown/">
        Adlai Brown
      </a>
      <a className="link" href="https://www.linkedin.com/in/lucymidgley/">
        Lucy Midgley
      </a>
      <a className="link" href="https://www.linkedin.com/in/noahdumba/">
        Noah Dumba
      </a>
     </h2>
    </section>
  );
}