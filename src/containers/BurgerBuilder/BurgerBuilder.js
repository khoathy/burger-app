import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        totalPrice: 3
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
    }

    render () {
        return (
            <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler} />
            </Aux>
        )
    }
}

export default BurgerBuilder;