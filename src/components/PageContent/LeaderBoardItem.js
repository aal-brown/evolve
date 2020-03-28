import React, { useState } from "react";
import axios from "axios";
import "./LeaderBoard.scss";


export default function MyGamesItem(props) {
  return (
  <tr>
    <td>{props.name}</td>
    <td>{props.game_name}</td> 
    <td>{props.highest_score}</td> 
  </tr>
  )
}