import React from "react";
import styles from "./CheckoutSummary.css";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const CheckoutSummary = (props) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tastes well </h1>
      <div style={{ width: "100%", margin: "0 auto" }}>
        <Burger ingredients={props.ingredients} />
        <Button buttonType="Danger" clicked={props.checkoutCancelled}>
          CANCEL
        </Button>
        <Button buttonType="Success" clicked={props.checkoutContinued}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
