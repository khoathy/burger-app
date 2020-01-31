import React from 'react';
import classes from './Order.css';

const order = (props) => {

    //convert to array of ingredients
    const ingredients =[];
    for(let property in props.ingredients) {
        ingredients.push(
            {
                ingredientName: property,
                amount: props.ingredients[property]
            }
        );
    }

    //output ingredients to text
    const ingredientOutput = ingredients.map(ig => {
        return  <span className={classes.Ingredient} key={ig.ingredientName}>
                    {ig.ingredientName} ({ig.amount})
                </span>
    })


    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
}


export default order;