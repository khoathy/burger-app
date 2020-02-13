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
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg: 'Please enter your Name'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Address'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg: 'Please enter your Street Address'
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value:'',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false,
                errorMsg: 'Please enter 5-number ZIP Code'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg: 'Please enter your Email'
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'express', displayValue: 'Express shipping'},
                        {value: 'standard', displayValue: 'Standard shipping' }
                    ]
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg: 'Please select shipping'
            },
        },
        loading: false
    }

    orderHandler =(event) => {
        //prevent reloading the page
        event.preventDefault();

        //show spinner when loading
        this.setState({loading: true});
        
        //create form data
        const formData = {};
        for(let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }

        //store order data
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    // check if input is valid
    checkValidity(value, requirement) {
        let isValid = true;

        if(requirement.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(requirement.minLength) {
            isValid = value.length >= requirement.minLength && isValid
        }

        if(requirement.maxLength) {
            isValid = value.length <= requirement.maxLength && isValid
        }

        return isValid;
    }

    //show typed input on the form and check validity
    inputChangedHandler = (event, inputId) => {
        //console.log(event.target.value);
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputId]};

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputId] =  updatedFormElement;
        console.log(updatedFormElement);

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
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id} 
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        touched={formElement.config.touched}
                        changed={(event)=> this.inputChangedHandler(event,formElement.id)}
                        invalid={!formElement.config.valid}
                        errorMsg={formElement.config.errorMsg}
                        
                    />
                ))}
                {/* <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
                <Input inputtype="input" type="email" name="email" placeholder="Your Email" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" name="postal" placeholder="Postal Code" /> */}
                <Button btnType="Success">Order</Button>
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