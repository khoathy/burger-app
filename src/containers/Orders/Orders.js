import React, { Component } from 'react';

import classes from './Orders.css';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
        .then(res => {
            //console.log(res.data);

            //turn the orders obj to an array
            const fetchedOrders = [];
            for(let key in res.data) {
                fetchedOrders.push({
                    id: key, 
                    ...res.data[key]
                });
            }
            this.setState({loading: false, orders: fetchedOrders})
        })
        .catch(err => {
            this.setState({loading: false})
        });
    }

    render() {
        return(
            <div className={classes.Orders}>
                {this.state.orders.map(order=> (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price} />
                ))}
            </div>
        );
    }

}

export default Orders;