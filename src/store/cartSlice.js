import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index === -1) {
                state.products.push(action.payload);
            } else {
                state.products[index].quantity = action.payload.quantity;
            }
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload.id);
        }
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
