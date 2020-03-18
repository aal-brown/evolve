import React from "react";
import axios from "axios";
import Button from "../Button.js"
import "./LeftSideBar.scss"

export default function Leftsidebar(props) {
  
  return (

    <section className="sidebarButtons">
      <Button onClick={props.addOrg}>Add Organism</Button>
      <Button onClick={props.addFood}>Add Food</Button>
      <Button onClick={props.changeTemp}>Change Temperature</Button>
      <Button onClick={props.save}>Save</Button>
      <Button onClick={props.getSeed}>Get Seed</Button>
    </section>
  );
}