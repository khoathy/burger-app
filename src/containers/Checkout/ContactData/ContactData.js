import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler =(event) => {
        //prevent reloading the page
        event.preventDefault();

        //show spinner when loading
        this.setState({loading:true});
        
        //example order
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'T',
                address: {
                    street: 'abc',
                    zipCode: '111'
                }
            },
            email: 'abc@gmail.com',
            delivery: 'express'
        }
        //send post request
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
            })
            .catch(error => {
                this.setState({loading: false});
            });

    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact here</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;