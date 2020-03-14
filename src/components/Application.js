import React, { useState, Fragment } from "react";
import axios from "axios";
import Topnav from "./Topnav"
import PageContent from "./PageContent/index"
import "components/Application.scss";

axios.get("https://agile-scrubland-73485.herokuapp.com/cells").then((res) => console.log(res))
  .catch((err) => console.log(err.message));


const topNavItems = [
  { name: "My Profile", id: 1 },
  { name: "My Games", id: 2 },
  { name: "About", id: 3 },
  { name: "Guide", id: 4 },
  { name: "Game", id: 5 }, 
  { name: "Login", id: 6 },
  { name: "Register", id: 7 }
];
export default function Application(props) {
  const [view, setView] = useState(6)
  return (
    <Fragment>
      <Topnav
        topNavItems={topNavItems}
        view={view}
        setView={setView}
      />
      <main className="layout">
        <PageContent
        view={view}
        />
      </main>
    </Fragment>
  );
}
