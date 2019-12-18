import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css'

const burger = (props) => {
    const ingredientsList = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])].map((_,i) => {
                return <BurgerIngredient key={ingKey + i} type={ingKey} />;
            })
        });
    
    //flatten array
    let ingredientsArr = ingredientsList.reduce((accumulator,current) => {
        return accumulator.concat(current)
    },[]);

    // Request user to add ingredients when there is no ingredient yet
    if (ingredientsArr.length === 0) {
        ingredientsArr = <p>Please add ingredients to your burger!</p>
    }


	return (
        <div className = {classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredientsArr}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};
 
export default burger;
