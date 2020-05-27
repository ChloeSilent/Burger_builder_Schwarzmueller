import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Inputs/Input'
export default class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input', elementConfig: {
                    type: 'text',
                    placeholder: 'name'
                },
                value: '',
                validation: {
                    required: true
                }, valid: false,
                touched: false
            },
            street: {
                elementType: 'input', elementConfig: {
                    type: 'text',
                    placeholder: 'street'
                },
                value: '',
                validation: {
                    required: true,
                }, valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input', elementConfig: {
                    type: 'number',
                    placeholder: 'zip code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLEngth: 6
                }, valid: false
            },
            country: {
                elementType: 'input', elementConfig: {
                    type: 'text',
                    placeholder: 'country'
                },
                value: '',
                validation: {
                    required: true,
                }, valid: false
            },
            email: {
                elementType: 'input', elementConfig: {
                    type: 'email',
                    placeholder: 'email'
                },
                value: '',
                validation: {
                    required: true,
                }, valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'fastest' },
                    { value: 'cheapest', displayValue: 'cheapest' }],
                    type: 'select',
                    placeholder: 'delivery method'
                },
                value: 'fastest',
                validation: {
                    required: false,
                }, valid: true,
                touched: false
            }
        },
        loading: false,
        formIsValid: false
    }

    checkValidity(val, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = val.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = val.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = val.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    submitHandler = (e) => {
        e.preventDefault();

        this.setState({ loading: true });
        const formData = {};
        for (let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('orders.json', order).then(res => {
            this.setState({ loading: false })
            this.props.history.push({
                pathname: "/"
            });
        }).catch(error => {
            this.setState({ loading: false })
        })
    }

    inputChangeHandler = (event, inputIdentifyer) => {

        let updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifyer] }

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(event.target.value, updatedFormElement.validation)
        updatedOrderForm[inputIdentifyer] = updatedFormElement
        let formIsValid = true;
        for(let inputIdentifyer in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifyer].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid })
    }

    render() {

        const InputsContainer = [];
        for (let key in this.state.orderForm) {

            InputsContainer.push(<Input
                key={key}
                elementType={this.state.orderForm[key].elementType}
                elementConfig={{ ...this.state.orderForm[key].elementConfig }}
                value={this.state.orderForm[key].value}
                invalid={!this.state.orderForm[key].valid}
                shouldValidate={this.state.orderForm[key].validation}
                touched = {this.state.orderForm[key].touched}
                changed={(e) => { this.inputChangeHandler(e, key) }} />)
        }
        let form =
            <form onSubmit={this.submitHandler}>
                <h4>Enter your contact data</h4>
                {InputsContainer}
                <Button buttonType='Success' disabled={!this.state.formIsValid}>Submit</Button>
            </form>
            ;

        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className='ContactData'>
                {form}
            </div>
        )
    }
}
