import { configureStore } from '@reduxjs/toolkit';
import formsSlice from './formsSlice';

export const store = configureStore({
    reducer: {
        forms: formsSlice,
    },
});
