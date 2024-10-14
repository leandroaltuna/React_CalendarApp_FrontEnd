import { configureStore } from '@reduxjs/toolkit';
import { calendarSlice, uiSlice } from './';


export const store = configureStore({
    reducer: {
        calendarStore: calendarSlice.reducer,
        uiStore: uiSlice.reducer,
    },
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck: false, //* para que no serialize las fechas.
    })
});