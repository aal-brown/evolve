import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import LeaderBoardItem from "./LeaderBoardItem";
import "./LeaderBoard.scss";

export default function LeaderBoard(props) {
  const [leaders, setLeaders] = useState([])
  function getLeaders(){
  axios.get("https://agile-scrubland-73485.herokuapp.com/games", {
  })
  .then((res) => {
    let gamesArr = res.data
    gamesArr.sort((a,b) => {return b.highest_score - a.highest_score})
    let top10;
    if(gamesArr.length >= 10){
      top10 = (gamesArr.filter((item, index) => index < 10 && item.highest_score ))
    } else {
      top10 = gamesArr;
    }
    let leaderTable = [];
    let userPromises = [];
    for(const game of top10){
      userPromises.push(axios.get(`https://agile-scrubland-73485.herokuapp.com/users/${game.user_id}`))
    }
    Promise.all(userPromises)
    .then((res) => {
      console.log(res)
        for(let i = 0; i<top10.length; i++){
            leaderTable.push([res[i].data.name, top10[i].highest_score, top10[i].name, i])
        }
        setLeaders(leaderTable)
    })
    .catch((e) => {
        console.log(e)
    });
  }).catch((err) => console.log(err))
}
let leadersItems = leaders.map((leader) => {
  console.log("inside use effect", leaders)

  return (
    <LeaderBoardItem
    key = {leader[3]}
      name = {leader[0]}
      highest_score = {leader[1]}
      game_name = {leader[2]}
      />
  );
});

  useEffect(()=>{
    getLeaders()
  }, [])


useEffect(()=>{
  leadersItems = leaders.map((leader) => {
    console.log("inside use effect", leaders)
  
    return (
      <LeaderBoardItem
        key = {leader[3]}
        name = {leader[0]}
        highest_score = {leader[1]}
        game_name = {leader[2]}
        />
    );
  });
}, [leaders, setLeaders, getLeaders])
  return (
    <Fragment>
    <h2 className="LeaderBoardText">Top 10 highest scores</h2>
    <div className=" table table-dark table-item-Lb">
      <table>
        <thead>
          <tr>
            <th style={{width: "30%"}}>Name</th>
            <th style={{width: "90%"}}>Game Name</th>
            <th style={{width: "65%"}}>Score</th>
          </tr>
        </thead>
        <tbody>
       {leadersItems}
       </tbody>
      </table>
    </div>
    </Fragment>
  );
}