import React from 'react';
import BurgerIngridient from './BurgerIngridient/BurgerIngridient';
import styles from './Burger.module.css';

const burger = (props) => {

  let transformedIngridients = Object.keys(props.ingridients).map(item => {
    return [...Array(props.ingridients[item])].map((_, i) => {
      return <BurgerIngridient key={item + i} type={item} />
    })
  }).flat()


  if (transformedIngridients.length === 0) {
    transformedIngridients = (<p>Please start adding ingridients</p>)
  }

  return (
    <div className={styles.Burger}>
      <BurgerIngridient type='bread-top' />
      {transformedIngridients}
      <BurgerIngridient type='bread-bottom' />
    </div>
  );
};

export default burger;