import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from '../BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]
const BuildControls = (props) => {
    return (
        <div className={styles.BuildControls}>
            <p>Current price: <strong>{props.price.toFixed(2)}</strong> </p>
            {controls.map(
                c => <BuildControl
                    key={c.label}
                    label={c.label}
                    added={() => props.ingridientAdded(c.type)}
                    removed={() => props.ingridientRemoved(c.type)}
                    disabled={props.disabled[c.type]} />
            )}
            <button
            className={styles.OrderButton}
            disabled={!props.purchaseable}
            onClick={props.ordered}>ORDER NOW</button>
        </div>
    );
};

export default BuildControls;