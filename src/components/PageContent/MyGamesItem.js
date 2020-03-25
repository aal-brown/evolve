import React from "react";
import Button from "../Button"
import "./MyGamesItem.scss"
// import "./TopnavItem.scss"

export default function MyGamesItem(props) {

  // Remember to implement the scss
let dateSaved = new Date(props.updated_at).toDateString();
let dateCreated = new Date(props.created_at).toDateString();
  return (
    <div className="table table-dark table-item ">
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Save Date</th>
            <th scope="col">Organisms</th>
            <th scope="col">Highest Score</th>
            <th scope="col">Age</th>
            <th scope="col">Date Created</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.name}</td>
            <td>{dateSaved}</td>
            <td>{props.orgs}</td>
            <td>{props.high_score}</td>
            <td>{props.age}</td>
            <td>{dateCreated}</td>
            <td><Button onClick={props.load}>Load</Button></td>
            <td><Button onClick={props.delete}>Delete</Button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}