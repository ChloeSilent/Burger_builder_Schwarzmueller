import React from 'react';
import BurgerIngridient from './BurgerIngridient/BurgerIngridient';
import styles from './Burger.module.css';

const burger = (props) => {

  let transformedingredients = Object.keys(props.ingredients).map(item => {
      
    return [...Array(props.ingredients[item])].map((_, i) => {
      return <BurgerIngridient key={item + i} type={item} />
    })
  }).flat()


  if (transformedingredients.length === 0) {
    transformedingredients = (<p>Please start adding ingredients</p>)
  }

  return (
    <div className={styles.Burger}>
      <BurgerIngridient type='bread-top' />
      {transformedingredients}
      <BurgerIngridient type='bread-bottom' />
    </div>
  );
};

export default burger;