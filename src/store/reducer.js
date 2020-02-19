import * as actionTypes from './actions';

const initialState = {
    ingredients : {
        tomato: 0,
        cheese: 0,
        meat: 0,
        vegan: 0,
        salad: 0,
    },
    totalPrice: 3,
};

const reducer = (state = initialState, action) => {
    
};

export default reducer;