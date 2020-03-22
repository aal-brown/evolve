import React, { useState, useEffect } from "react";
import TopnavItem from "./TopnavItem";
import axios from "axios"
import "components/Topnav.scss";

export default function Topnav(props) {
  const [user, setUser] = useState("");

  function getData() {
    axios.get("http://localhost:3000/getuser", {
      headers: { "ID": props.cookies.user_id }
    })
    .then((res) => {
      setUser(res.data.name);
    })
  }

  function setGameCookie() {
    const user_id = props.cookies.user_id;
    const url = "http://localhost:3000/games";

    axios.get("http://localhost:3000/getuser", {
      headers: { "ID": user_id }
    })
    .then((res) => {
      axios({
        method: 'POST',
        url,
        data: {
          user_id: res.data.id,
          name: "game name"
        },
        mode: 'no-cors',
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          // 'Accept': '*/*',
          'Content-Type': 'application/json'
          // 'User-Agent': 'axios'
        }
      })
      .then(resp => {
        console.log(resp);
        props.setCookie("game_id", resp.data.id)
      })
      .catch(err => console.error(err.message));
    })
  }

  useEffect(() => {
    if(props.cookies.user_id){
      getData()
    }
  }, [props.cookies.user_id]);

  const topNavItems = props.topNav;
  const items = topNavItems.map((item) => {
    return <TopnavItem
      key = {item.id}
      name={item.name}
      selected = {item.id === props.view}
      setView={() => {
        if(item.id === 8) {
          props.removeCookie("user_id")
          setUser("")
        } else if (item.id === 5 && props.cookies.user_id && !props.cookies.game_id) {
          setGameCookie();
        }
        props.setView(item.id)}
      }
    />
  });
  return ( 
    <header className="topnav">
    <h2 className="header-text">Evolve</h2>
    {user && <h4>Welcome: {user}</h4>}
    <div className="nav-views">{items}</div>
  </header>);
}