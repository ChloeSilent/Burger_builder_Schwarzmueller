import React, { Component } from 'react';
import Auxiliary from '../../hoc/auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.jsx';
const INGRIDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.6,
    cheese: 0.6,
    meat: 1.3
}
class BurgerBuilder extends Component {
    state = {
        ingridients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState(ingridients) {
        // let sum = Object.keys(ingridients).map( key => {
        //     return ingridients[key]
        // }).reduce((sum, el ) => {
        //     return sum + el
        // }, 0)
        let sum = Object.values(ingridients).reduce(function (sum, current) {
            return sum + current;
        }, 0);

        this.setState({ purchaseable: sum >= 0 })
    }

    addIngridientHandler = (type) => {
        const oldCount = this.state.ingridients[type]
        const upatedCount = oldCount + 1;
        const updatedIngridients = { ...this.state.ingridients }
        const priceAddition = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;

        // console.log('priceAddition', priceAddition, 'oldPrice', oldPrice, 'updatedPrice', updatedPrice)
        updatedIngridients[type] = upatedCount;

        this.setState({
            totalPrice: updatedPrice,
            ingridients: updatedIngridients
        })
        this.updatePurchaseState(updatedIngridients);
    }



    removeIngridientHandler = (type) => {
        const oldCount = this.state.ingridients[type]

        if (oldCount <= 0) {
            return
        }
        const upatedCount = oldCount - 1;
        const updatedIngridients = { ...this.state.ingridients }
        const priceAddition = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceAddition;


        updatedIngridients[type] = upatedCount;

        this.setState({
            totalPrice: updatedPrice,
            ingridients: updatedIngridients
        })
        this.updatePurchaseState(updatedIngridients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }
    purchaseContinueHandler = () => {
        console.log("continue")
    }

    render() {
        const disabledInfo = { ...this.state.ingridients }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Auxiliary>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingridients={this.state.ingridients}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingridients={this.state.ingridients} />
                <BuildControls
                    price={this.state.totalPrice}
                    ingridientAdded={this.addIngridientHandler}
                    ingridientRemoved={this.removeIngridientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;