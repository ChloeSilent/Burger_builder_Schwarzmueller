import React from "react";
import "./Button.css";
const Button = (props) => {
  let classes = [props.buttonType, "Button"];
  console.log(props.buttonType)
  return (
    
    <button onClick={props.clicked} className={classes.join(" ")}>
      {props.children}
    </button>
  );
};

export default Button;
