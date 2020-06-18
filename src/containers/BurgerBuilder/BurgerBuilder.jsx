import React, { Component } from "react";
import Auxiliary from "../../hoc/auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary.jsx";
import Spinner from '../../components/UI/Spinner/Spinner';
//import axios from '../../axios-orders';
import { connect } from "react-redux";
import * as actionTypes from '../../store/actions';

import { withRouter } from "react-router-dom";

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {

        // axios.get('https://burgerbuilder-8ab50.firebaseio.com/ingredients.json')
        //     .then(response => {

        //         // this.setState({ ingredients: response.data });
        //         this.props.fetchIngredients(response.data)
        //     })
        //     .catch(error => {
        //         this.setState({ error: true });
        //     });

    }

    updatePurchaseState(ingredients) {

        let sum = Object.values(ingredients).reduce(function (sum, current) {
            return sum + current;
        }, 0);

        this.setState({ purchasable: sum >= 0 });
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const upatedCount = oldCount + 1;
    //     const updatedingredients = { ...this.state.ingredients };
    //     const priceAddition = INGRIDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const updatedPrice = oldPrice + priceAddition;

    //     updatedingredients[type] = upatedCount;

    //     this.setState({
    //         totalPrice: updatedPrice,
    //         ingredients: updatedingredients,
    //     });
    //     this.updatePurchaseState(updatedingredients);
    // };

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];

    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const upatedCount = oldCount - 1;
    //     const updatedingredients = { ...this.state.ingredients };
    //     const priceAddition = INGRIDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const updatedPrice = oldPrice - priceAddition;

    //     updatedingredients[type] = upatedCount;

    //     this.setState({
    //         totalPrice: updatedPrice,
    //         ingredients: updatedingredients,
    //     });
    //     this.updatePurchaseState(updatedingredients);
    // };

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
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString,
        });
    };


    render() {
        const disabledInfo = { ...this.props.ingredients };
        console.log(this.props)
        for (let key in disabledInfo) {

            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>ingredients can't be loaded!</p> : <Spinner />;
        if (this.props.ingredients) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.props.totalPrice} />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
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

const mapStateToProps = state => {

    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        onIngredientAdded: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredientName: ingredientName }),
        onIngredientRemoved: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingredientName }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BurgerBuilder));

