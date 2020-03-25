import React from "react";
import axios from "axios";
import "./Guide.scss";

export default function Guide(props) {
  let user_id = props.cookies.user_id
  return (
    <section>
       <h2  className="guide-welcome-text">Welcome to Evolve where you can build your very own colony of orgs! They will evolve before your very eyes!</h2>
      <ul className="guide-text">
        <li>To start a new game, go to Game in the nav-bar. Alternatively, once you're made an account you can load a saved game to its last saved state.</li>
        <li>Clicking Add Org lets you add more orgs into your colony</li>
        <li>Clicking Add food positions food randomly on the org-world </li>
        <li>Got a favourite org you want to feed? Toggling feed lets you add food whereever you click.</li>
        <li>The add blocks toggle let you build walls on the org ground to save your orgs from predators or stop a greedy org from eating all the food!</li>
        <li>The delete toggle lets you delete any unwanted food, orgs and blocks by clicking on them</li>
        <li>Once you've made an account you can click on save to store your game, clicking load on the home-game page lets you continue any saved game.</li>
        <li>Toggling predator mode lets you enable to naturally predatory orgs to attack! </li>
        <li>Clicking on an org lets you see all of his or her attributes</li>
        <li>At the top of the screen you can see the main statistics for your colony.</li>
        <li>You can hide the menu buttons by clicking on the menu icon in the top left corner</li>
        <li>You can make the game full screen by clicking the icon in the top right. You can also turn the music on or off with the speaker button.</li>
      </ul>
      <h2 className="guide-welcome-text">Happy evolving!</h2>
    </section>
  );
}