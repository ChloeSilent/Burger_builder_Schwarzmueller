import React from 'react';
import Button from '../../UI/Button/Button'
const orderSummary = (props) => {

    const ingredientsummary = Object.keys(props.ingredients).map(item => {
        return (<li key={item}>
            <span style={{ textTransform: 'capitalize' }}>
                {item}</span>
                : {props.ingredients[item]}
        </li>)
    })

    return (
        <>
            <h3>Your order</h3>
            <p>A delicious burger with: </p>
            <ul>
                {ingredientsummary}
            </ul>
            <p><strong>Total proce: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={props.purchaseContinued} buttonType="Success">CONTINUE</Button>
            <Button clicked={props.purchaseCanceled} buttonType="Danger">CANCEL</Button>
        </>
    );
};

export default orderSummary;