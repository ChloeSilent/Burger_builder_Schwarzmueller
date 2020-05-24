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
                value: ''
            },
            street: {
                elementType: 'input', elementConfig: {
                    type: 'text',
                    placeholder: 'street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input', elementConfig: {
                    type: 'number',
                    placeholder: 'zip code'
                },
                value: ''
            },
            country: {
                elementType: 'input', elementConfig: {
                    type: 'text',
                    placeholder: 'country'
                },
                value: ''
            },
            email: {
                elementType: 'input', elementConfig: {
                    type: 'email',
                    placeholder: 'email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'fastest' },
                    { value: 'cheapest', displayValue: 'cheapest' }],
                    type: 'select',
                    placeholder: 'delivery method'
                },
                value: ''
            }
        },
        loading: false
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log('props', this.props.price)
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Olga Olga',
                adress: {
                    street: 'Musterstreet',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@mail.com',
                deliveryMethod: 'fastest'
            }
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

        updatedFormElement.value = event.target.value
        updatedOrderForm[inputIdentifyer] = updatedFormElement
        this.setState({ orderForm: updatedOrderForm })
    }

    render() {

        const InputsContainer = [];
        for (let key in this.state.orderForm) {

            InputsContainer.push(<Input
                key={key}
                elementType={this.state.orderForm[key].elementType}
                elementConfig={{ ...this.state.orderForm[key].elementConfig }}
                value={this.state.orderForm[key].value}
                changed={(e) => { this.inputChangeHandler(e, key) }} />)
        }
        let form =
            <form onSubmit={this.submitHandler}>
                <h4>Enter your contact data</h4>
                {InputsContainer}
                <Button buttonType='Success'>Submit</Button>
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
