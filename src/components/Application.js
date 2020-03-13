import React from "react";
import axios from "axios";
import "components/Application.scss";

let cells = axios.get("/cells");

console.log(cells);

export default function Application(props) {
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
