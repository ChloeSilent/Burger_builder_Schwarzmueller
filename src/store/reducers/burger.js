const initialState = {
    ingredients: {
        salad: 1,
        bacon: 1,
        cheese: 1,
        meat: 1,
    },
    totalPrice: 4,
}

const INGRIDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.6,
    cheese: 0.6,
    meat: 1.3,
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "FETCH_INGREDIENTS":

            return {
                ...state,
                ingredients: action.ingredients
            }
        case "ADD_INGREDIENT_HANDLER":
            const oldCount = state.ingredients[action.type];
            const upatedCount = oldCount + 1;
            const updatedingredients = { ...state.ingredients };
            const priceAddition = INGRIDIENT_PRICES[action.type];
            const oldPrice = state.totalPrice;
            const updatedPrice = oldPrice + priceAddition;

            updatedingredients[action.type] = upatedCount;
        return {
            ...state,
            ingredients: updatedingredients,
            totalPrice: updatedPrice
        }
        case "REMOVE_INGREDIENT_HANDLER":
            const oldCount2 = state.ingredients[action.type];

            if (oldCount2 <= 0) {
                return;
            }
            const upatedCount2 = oldCount2 - 1;
            const updatedingredients2 = { ...state.ingredients };
            const priceAddition2 = INGRIDIENT_PRICES[action.type];
            const oldPrice2 = state.totalPrice;
            const updatedPrice2 = oldPrice2 - priceAddition2;

            updatedingredients2[action.type] = upatedCount2;

            return {
                totalPrice: updatedPrice2,
                ingredients: updatedingredients2,
            };

        default: return {state}
    }

}

export default reducer;