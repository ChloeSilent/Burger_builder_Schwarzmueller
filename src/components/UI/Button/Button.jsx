import React from "react";
import "./Button.css";
const Button = (props) => {
  let classes = [props.buttonType, "Button"];

  return (

    <button onClick={props.clicked} className={classes.join(" ")} disabled={props.disabled}>
      {props.children}
    </button>
  );
};

export default Button;
