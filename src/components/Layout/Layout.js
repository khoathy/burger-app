import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer : false
    }

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false});
    }

    toggleSideDrawerHandler = () => {
        this.setState( (previousState) => {
            return {showSideDrawer: !previousState.showSideDrawer };
        });
    }
    
    render () {
        return (
            <Aux>
                <Toolbar 
                    toggleMenu={this.toggleSideDrawerHandler}/>
                <SideDrawer 
                    close={this.closeSideDrawerHandler}
                    open={this.state.showSideDrawer}/>
                <div> Backdrop</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
} 

export default Layout;