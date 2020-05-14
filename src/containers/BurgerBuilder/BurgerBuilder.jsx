import React, { Component } from "react";
import Auxiliary from "../../hoc/auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary.jsx";
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

import { withRouter } from "react-router-dom";
const INGRIDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.6,
    cheese: 0.6,
    meat: 1.3,
};
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1,
          },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        //console.log(this.props);
        axios.get('https://burgerbuilder-8ab50.firebaseio.com/ingredients.json')
            .then(response => {
                console.log("res", response.data)
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error: true });
            });
            console.log("state", this.state.ingredients)
    }

    updatePurchaseState(ingredients) {
        let sum = Object.values(ingredients).reduce(function (sum, current) {
            return sum + current;
        }, 0);

        this.setState({ purchaseable: sum >= 0 });
    }

    addIngridientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const upatedCount = oldCount + 1;
        const updatedingredients = { ...this.state.ingredients };
        const priceAddition = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;

        updatedingredients[type] = upatedCount;

        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedingredients,
        });
        this.updatePurchaseState(updatedingredients);
    };

    removeIngridientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }
        const upatedCount = oldCount - 1;
        const updatedingredients = { ...this.state.ingredients };
        const priceAddition = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceAddition;

        updatedingredients[type] = upatedCount;

        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedingredients,
        });
        this.updatePurchaseState(updatedingredients);
    };

    purchaseHandler = () => {
        this.setState({
            purchasing: true,
        });
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false,
        });
    };
    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString,
        });
    };


    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>ingredients can't be loaded!</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Auxiliary>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default withRouter(BurgerBuilder);
