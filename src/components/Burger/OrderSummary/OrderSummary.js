import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key ={igKey}> 
                    <span style = {{textTransform: 'capitalize'}}> {igKey} </span> : {props.ingredients[igKey]}
                </li> );
        });

    return (
        <Aux>
            <div className = {classes.OrderSummary}>
                <h3>Your Order</h3>
                <p> A delicious burger with the following ingredients:</p>
                <ul className = {classes.OrderList}>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price : {props.totalPrice}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType = "Danger" clicked = {props.orderCancel}>Cancel</Button>
                <Button btnType = "Success" clicked = {props.orderContinue}>Continue</Button>
            </div>
            
        </Aux>
    );
};

export default orderSummary;