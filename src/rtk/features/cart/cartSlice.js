import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        increaseQuantity: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id);

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
            }
            else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        decreaseQuantity: (state, action) => {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            // else if (state.cartItems[itemIndex].cartQuantity === 1) {
            //     const nextCartItem = state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id);

            //     state.cartItems = nextCartItem;
            // }
        },
        removeFromCart: (state, action) => {
            const nextCartItem = state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id);

            state.cartItems = nextCartItem;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

        },
        clearCart: (state) => {
            state.cartItems = []
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        getTotals(state) {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                }
            );
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        }
    }
})

export default cartSlice.reducer
export const { increaseQuantity, decreaseQuantity, removeFromCart, clearCart, getTotals } = cartSlice.actions