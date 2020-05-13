import React from "react";
import "./NavigationItem.css";
import  {Link} from "react-router-dom";
const NavigationItem = (props) => {
  return (
    <li className="NavigationItem">
      <Link to={props.link} className={props.active ? "active" : null}>
        {props.children}
      </Link>
    </li>
  );
};

export default NavigationItem;
