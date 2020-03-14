import React from "react";
import classnames from "classnames";
import "./TopnavItem.scss"

export default function TopnavItem(props) {
  const topnavClass = classnames("topnav-list__item",{
    "topnav-list__item--selected": props.selected,
  });

  return (
    <li className={topnavClass} onClick={props.setView}>
      <h4 className="text--light">{props.name} {props.selected}</h4>
    </li>
  );
}