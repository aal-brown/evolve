import React, {useState, useEffect} from "react";
import axios from "axios";
import "./MyProfile.scss"

export default function MyProfile(props) {

  const [games, setGame] = useState({})
  const [user, setUser] = useState({})
  let user_id = props.cookies.user_id

  function getData() {
    axios.get("https://agile-scrubland-73485.herokuapp.com/getuser", {
      headers: { "ID": user_id }
    })
    .then((res) => {
      console.log(res)
      setUser(res.data)
      axios.get("https://agile-scrubland-73485.herokuapp.com/games", {
        headers: { "ID": res.data.id }
      })
      .then((res) => {
        console.log(res.data);
        let highestScore = 0;
        let playtimeSum = 0;
        let totalOrgs = 0;
        res.data.forEach((val) => {
          if (highestScore < val.highest_score) {
            highestScore = val.highest_score
          }
          playtimeSum += val.playtime;
          totalOrgs += val.num_of_orgs
        })

        let gameStatsObj = {
          games: res.data.length,
          highestScore: highestScore,
          playtime: playtimeSum,
          totalorgs: totalOrgs
        }

        return setGame(gameStatsObj)
      }
      );
    })
  }


  useEffect(() => {
    if(props.cookies.user_id){
      getData()
    }
  }, [])

  return (
    <section className="myProfile">
      <section className="profileContainer">
        <header></header>
        <h1><b>Name:</b> {user.name}</h1>
        <h4><b>Email:</b> {user.email}</h4>
        <h4><b>Number of Games:</b> {games.games}</h4>
        <h4><b>Highest Score:</b> {games.highestScore}</h4>
        <h4><b>Playtime:</b> {games.playtime}</h4>
        <h4><b>Total Orgs:</b> {games.totalorgs}</h4>
      </section>
    </section>
  );
}