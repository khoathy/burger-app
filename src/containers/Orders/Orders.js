import React, { Component } from 'react';
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
            //turn the orders obj to an array
            console.log(res.data);
            const fetchedOrders = [];
            for(let key in res.data) {
                console.log(...res.data[key]);
                fetchedOrders.push({
                    id: key, 
                    ...res.data[key]
                });
            }
            
            this.setState({loading: false})
        })
        .catch(err => {
            this.setState({loading: false})
        });
    }

    render() {
        return(
            <div>
                <Order />
                <Order />
            </div>
        );
    }

}

export default Orders;