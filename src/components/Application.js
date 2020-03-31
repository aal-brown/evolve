import React, { useState, Fragment, useEffect } from "react";
import Topnav from "./Topnav"
import PageContent from "./PageContent/index"
import { useCookies } from "react-cookie"
import "components/Application.scss";

// const gameData = [
//   {id: 1,
//   img: "NO IMAGE YET",
//   created_at: "Mar 1, 2020",
//   updated_at: "Mar 11, 2020",
//   age: "100 Game Cycles",
//   name: "Coolest Game Ever",
//   orgs: 20,
//   high_score: 2000,
//   load() { console.log("Hello") },
//   delete() { console.log("Delete") }
//   },
//   {id: 2,
//     img: "NO IMAGE YET",
//     created_at: "Mar 2, 2020",
//     updated_at: "Mar 5, 2020",
//     age: "50 Game Cycles",
//     name: "Coolest Game Ever2",
//     orgs: 10,
//     high_score: 900,
//     load() { console.log("Hello") },
//     delete() { console.log("Delete") }
//     }
// ]

export default function Application(props) {
  const [view, setView] = useState(4)
  const [cookies, setCookie, removeCookie] = useCookies(['user_id', 'game_id']);
  const [topNav, setTopNav] = useState([]);
  
  
  
  
useEffect(() => {
  if(cookies.user_id){
    setTopNav([
      { name: "Guide", id: 4 },
      { name: "Leaderboard", id: 9 },
      { name: "Game", id: 2 },
      { name: "My Profile", id: 1 },
      { name: "Logout", id: 8 },
      { name: "About", id: 3 }
    ])
  } else {
    setTopNav([
      { name: "Guide", id: 4 },
      { name: "Leaderboard", id: 9 },
      { name: "Game", id: 2 },
      { name: "Login", id: 6 },
      { name: "Register", id: 7 },
      { name: "About", id: 3 }
    ])
  }
}, [cookies.user_id])
  
  
  return (
    <Fragment>
      <Topnav
        topNav={topNav}
        setTopNav={setTopNav}
        view={view}
        setView={setView}
        cookies={cookies}
        setCookie={setCookie}
        removeCookie={removeCookie}
      />
      <main className="layout">
        <PageContent
        //games={gameData}
        view={view}
        setView={setView}
        cookies={cookies}
        setCookie={setCookie}
        removeCookie={removeCookie}
        setTopNav={setTopNav}
        />
      </main>
    </Fragment>
  );
}
