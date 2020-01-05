import React from 'react';

import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: "Meat", type:"meat"},
    {label: "Vegan", type:"vegan"},
    {label: "Cheese", type:"cheese"},
    {label: "Tomato", type:"tomato"},
    {label: "Salad", type:"salad"},
];

const buildControls = (props) => (
    <div className = {classes.BuildControls}>
        <p className = {classes.TotalPrice}>Total price : ${props.price.toFixed(2)}</p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                removeDisabled={props.removeDisabled[ctrl.type]}
                addDisabled={props.addDisabled[ctrl.type]}
            />
        ))}
        <button 
            className = {classes.OrderButton}
            disabled = {!props.orderable}
            onClick = {props.orderSummary}>Order now</button>
    </div>
);

export default buildControls;