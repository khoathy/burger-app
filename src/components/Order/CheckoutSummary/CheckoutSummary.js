import React from 'react';
import classes from './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button  from '../../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h2>Checkout</h2>
            <div className={classes.Burger}>
                <Burger ingredients={props.ingredients} />
            </div>
            <p>Continue to place the order?</p>
            <Button
                btnType="Danger"
                clicked = {props.checkoutCancel}>CANCEL</Button>
            <Button
                btnType="Success"
                clicked = {props.checkoutContinue}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;