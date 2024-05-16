import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        pickup: '',
    },

    reducers: {
        setPickUp: (state, action) => {
            state.pickup = action.payload;
        },
    },
});


export const { setPickUp } = orderSlice.actions;


export default orderSlice.reducer;