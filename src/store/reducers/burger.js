const initialState = {
    ingredients: {
        salad: 1,
        bacon: 1,
        cheese: 1,
        meat: 1,
    },
    totalPrice: 4,
}

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
            const oldCount = state.ingredients[action.type];

            if (oldCount <= 0) {
                return;
            }
            const upatedCount = oldCount - 1;
            const updatedingredients = { ...state.ingredients };
            const priceAddition = INGRIDIENT_PRICES[action.type];
            const oldPrice = state.totalPrice;
            const updatedPrice = oldPrice - priceAddition;
    
            updatedingredients[action.type] = upatedCount;
    
            return {
                totalPrice: updatedPrice,
                ingredients: updatedingredients,
            };
            
        default: return {state}
    }
}