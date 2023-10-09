import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: 'stringForm',
        text: ''
    }, {
        id: 'tableForm',
        text: 'USD'
    }
];

export const formsSlice = createSlice({
    name: 'forms',
    initialState,
    reducers: {
        save: (state, action) => {
            const editableItem = action.payload;

            return state.map(item => item.id === editableItem.id ? editableItem : item)
        },
    },
});

export const { save } = formsSlice.actions;

export default formsSlice.reducer;
