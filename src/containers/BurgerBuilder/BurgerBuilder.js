import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

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
        loading: false
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

    // show Summary when click order button
    showSummaryHandler = () => {
        this.setState({showSummary:true});
    }

    // hide Summary when click backdrop
    hideSummaryHandler = () => {
        this.setState({showSummary:false});
    }

    // continue to order
    orderContinueHandler = () => {
        
        // //show spinner when loading
        // this.setState({loading:true});
        
        // //example order
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'T',
        //         address: {
        //             street: 'abc',
        //             zipCode: '111'
        //         }
        //     },
        //     email: 'abc@gmail.com',
        //     delivery: 'express'
        // }
        // //send post request
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({loading: false, showSummary: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, showSummary: false});
        //     });

        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i)+ "=" + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            path: '/checkout',
            search: '?' + queryString
        });
    }

    render () {
        //Disable the buttons when there are no ingredients or too many ingredients added
        const removeDisabled = {...this.state.ingredients};
        
        const addDisabled = {...this.state.ingredients};
        for (let key in removeDisabled) {
            removeDisabled[key] = removeDisabled[key] <= 0;
        }
        for (let key in addDisabled) {
            addDisabled[key] = addDisabled[key] >= 6;
        }

        //Show Spinner when still loading
        let orderSummary = <OrderSummary 
            ingredients = {this.state.ingredients}
            totalPrice = {this.state.totalPrice}
            orderCancel = {this.hideSummaryHandler}
            orderContinue = {this.orderContinueHandler} />
        if(this.state.loading) {
            orderSummary = <Spinner />;
        }


        return (
            <Aux>
                <Modal show = {this.state.showSummary} modalClosed = {this.hideSummaryHandler}>
                    {orderSummary}
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