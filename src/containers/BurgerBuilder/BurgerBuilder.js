import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    tomato: 0.5,
    cheese: 0.5,
    meat: 1.5,
    vegan: 1.5,
    salad: 0.5,    
};

class BurgerBuilder extends Component {
    state = {
        ingredients : {
            tomato: 0,
            cheese: 0,
            meat: 0,
            vegan: 0,
            salad: 0,
        },
        totalPrice: 3,
        orderable: false,
        showSummary: false,
    }

    updateOrderableState = (ingredients) => {
        const sumOfIngredients = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum,el) => sum + el);
        this.setState({orderable: sumOfIngredients > 0})
    }

    addIngredientHandler = (type) => {
        //updated ingredients
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        //updated price
        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENT_PRICES[type];
        const updatedPrice = oldPrice + priceAddition;

        //update ingredients & total price
        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});

        //update orderable state
        this.updateOrderableState (updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        //updated ingredients
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {return;}

        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        //updated price
        const oldPrice = this.state.totalPrice;
        const priceDeduction = INGREDIENT_PRICES[type];
        const updatedPrice = oldPrice - priceDeduction;

        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});

        //update orderable state
        this.updateOrderableState (updatedIngredients);
    }

    showSummaryHandler = () => {
        this.setState({showSummary:true});
    }

    render () {
        const removeDisabled = {...this.state.ingredients};
        const addDisabled = {...this.state.ingredients};
        for (let key in removeDisabled) {
            removeDisabled[key] = removeDisabled[key] <= 0;
        }
        for (let key in addDisabled) {
            addDisabled[key] = addDisabled[key] >= 6;
        }
        return (
            <Aux>
                <Modal show = {this.state.showSummary}>
                    <OrderSummary ingredients = {this.state.ingredients}/>
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    removeDisabled = {removeDisabled}
                    addDisabled = {addDisabled}
                    price = {this.state.totalPrice}
                    orderable = {this.state.orderable}
                    orderSummary = {this.showSummaryHandler} />
            </Aux>
        )
    }
}

export default BurgerBuilder;