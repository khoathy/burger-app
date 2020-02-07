import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value:''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value:''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value:''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value:''
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'express', displayValue: 'Express shipping'},
                        {value: 'standard', displayValue: 'Standard shipping' }
                    ]
                },
                value:''
            },
        },
        loading: false
    }

    orderHandler =(event) => {
        //prevent reloading the page
        event.preventDefault();

        //show spinner when loading
        this.setState({loading: true});
        
        //example order
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        }
        //send post request
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                //redirect to home page when done
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    inputChangedHandler = (event, inputId) => {
        //console.log(event.target.value);

        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputId]};
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputId] =  updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }

    render() {
        //convert orderForm to array
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        
        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id} 
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        changed={(event)=> this.inputChangedHandler(event,formElement.id)}
                    />
                ))}
                {/* <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
                <Input inputtype="input" type="email" name="email" placeholder="Your Email" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" name="postal" placeholder="Postal Code" /> */}
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>    
        );
        if(this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact here</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;