import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    state = {
        ingredients : {
            tomato: 2,
            cheese: 1,
            meat: 0,
            vegan: 1,
            salad: 1,
        }
    }

    render () {
        return (
            <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <div>Burger Controls</div>
            </Aux>
        )
    }
}

export default BurgerBuilder;