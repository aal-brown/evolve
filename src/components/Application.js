import React from "react";
import axios from "axios";
import Topnav from "./Topnav"
import "components/Application.scss";

axios.get("https://agile-scrubland-73485.herokuapp.com/cells").then((res) => console.log(res))
.catch((err) => console.log(err.message));


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
