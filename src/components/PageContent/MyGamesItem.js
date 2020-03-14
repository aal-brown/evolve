import React from "react";
import classnames from "classnames";
// import "./TopnavItem.scss"

export default function MyGamesItem(props) {
  const myGamesClass = classnames("myGames-list__item",{
    "myGames-list__item--selected": props.selected,
  });

  // Remember to implement the scss

  return (
    <li className={myGamesClass}>
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
        <button onClick={props.delete}>DELETE</button>
      </div>
    </li>
  );
}