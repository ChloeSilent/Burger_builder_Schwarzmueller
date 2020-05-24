import React from 'react';
import './Order.css';
const Order = (props) => {

    var ingredients = [];
    for ( let i in props.ingredients) {
        ingredients.push(<p key={i}> {i} : {props.ingredients[i]}</p>);
    }

    return (
        <div className="Order">
            {ingredients}
            <p>Price: <strong>{(+props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default Order;