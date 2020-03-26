import React, { useState, useEffect } from "react";
import TopnavItem from "./TopnavItem";
import axios from "axios"
import "components/Topnav.scss";
// import blob from "./blob-green.png"
import blobSmall from "./blob-green-small2-r1.png"

export default function Topnav(props) {
  const [user, setUser] = useState("");

  function getData() {
    axios.get("https://agile-scrubland-73485.herokuapp.com/getuser", {
      headers: { "ID": props.cookies.user_id }
    })
    .then((res) => {
      setUser(res.data.name);
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
        }
        props.setView(item.id)}
      }
    />
  });
  return ( 
    <header className="topnav">
    <h2 className="header-text">Ev<img className="blob" src={blobSmall}/>lve</h2>
    {user && <h4 className="welcome-text">Welcome: {user}</h4>}
    <div className="nav-views">{items}</div>
  </header>);
}