import { configureStore } from '@reduxjs/toolkit';
import { authSlice, calendarSlice, uiSlice } from './';


export const store = configureStore({
    reducer: {
        authStore: authSlice.reducer,
        calendarStore: calendarSlice.reducer,
        uiStore: uiSlice.reducer,
    },
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck: false, //* para que no serialize las fechas.
    })
});