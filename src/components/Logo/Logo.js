import React from 'react';

import appLogo from '../../assets/images/logo.png';

import classes from './Logo.css';

const logo = (props) => (
    <div className = {classes.Logo}>
        <img src = {appLogo} alt = "burger logo" />
    </div>
);

export default logo;