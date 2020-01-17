import React from 'react';

import classes from './Spinner.css';

const spinner = (props) => (
    <div className={classes.Spinner}>
        <div className={classes.LdsEllipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    );

export default spinner;