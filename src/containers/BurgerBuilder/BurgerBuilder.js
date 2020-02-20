import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        //totalPrice: 3,
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

    // Below codes are for when we do not use redux
    // addIngredientHandler = (type) => {
    //     //updated ingredients
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;

    //     //updated price
    //     const oldPrice = this.state.totalPrice;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const updatedPrice = oldPrice + priceAddition;

    //     //update ingredients & total price
    //     this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});

    //     //update orderable state
    //     this.updateOrderableState (updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     //updated ingredients
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {return;}

    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;

    //     //updated price
    //     const oldPrice = this.state.totalPrice;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const updatedPrice = oldPrice - priceDeduction;

    //     this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice});

    //     //update orderable state
    //     this.updateOrderableState (updatedIngredients);
    // }

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
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i)+ "=" + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render () {
        //Disable the buttons when there are no ingredients or too many ingredients added
        const removeDisabled = {...this.props.ings};
        
        const addDisabled = {...this.state.ingredients};
        for (let key in removeDisabled) {
            removeDisabled[key] = removeDisabled[key] <= 0;
        }
        for (let key in addDisabled) {
            addDisabled[key] = addDisabled[key] >= 6;
        }

        //Show Spinner when still loading
        let orderSummary = <OrderSummary 
            ingredients = {this.props.ings}
            totalPrice = {this.props.price}
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
                <Burger ingredients = {this.props.ings}/>
                <BuildControls 
                    ingredientAdded={this.props.ingredientAdded}
                    ingredientRemoved={this.props.ingredientRemoved}
                    removeDisabled = {removeDisabled}
                    addDisabled = {addDisabled}
                    price = {this.props.price}
                    orderable = {this.state.orderable}
                    orderSummary = {this.showSummaryHandler} />
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        ingredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        ingredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);