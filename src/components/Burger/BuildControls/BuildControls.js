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
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)} 
            />
        ))}
    </div>
);

export default buildControls;