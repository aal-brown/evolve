import React from "react";
import classnames from "classnames";
import Button from "../Button"
// import "./TopnavItem.scss"

export default function MyGamesItem(props) {
  const myGamesItem = classnames("myGamesItem-list__item",{
    "myGamesItem-list__item--selected": props.selected,
  });

  // Remember to implement the scss

  return (
    <li className={myGamesItem}>
      <div onClick={props.load}>
        <p>{props.img}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Save Date</th>
            <th>Organisms</th>
            <th>Highest Score</th>
            <th>Age</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.name}</td>
            <td>{props.updated_at}</td>
            <td>{props.orgs}</td>
            <td>{props.high_score}</td>
            <td>{props.age}</td>
            <td>{props.created_at}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <Button onClick={props.delete}>Delete</Button>
      </div>
    </li>
  );
}