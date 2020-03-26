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
        
        setGame(res.data)
      }
      );
    })
  }

  function gameStats(games) {

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
        <h2><b>Email:</b> {user.name}</h2>
      </section>
    </section>
  );
}