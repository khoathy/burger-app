import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {
    state = {
        ingredients: {
            tomato: 1,
            cheese: 1,
            meat: 1,
            vegan: 1,
            salad: 1,    
        } 
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancel = {this.checkoutCancelHandler} 
                    checkoutContinue = {this.checkoutContinueHandler} />
            </div>
        )

    }
}

export default Checkout;