import React from "react";
import TopnavItem from "./TopnavItem";
import "components/Topnav.scss";




export default function Topnav(props) {
  const topNavItems = props.topNavItems;
  const items = topNavItems.map((item) => {
    return <TopnavItem
      key = {item.id}
      name={item.name}
      selected = {item.id === props.view}
      setView={(event) => {props.setView(item.id)}}
   />
  }); 
  return ( 
   <header className="topnav">
   <h2 className="header-text">Evolve</h2>
   <div className="nav-views">{items}</div>
</header>);
}