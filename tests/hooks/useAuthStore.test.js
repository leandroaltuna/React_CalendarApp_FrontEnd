import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { authSlice } from '../../src/store';
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { testUserCredentials } from '../fixtures/testUser';
import { calendarApi } from '../../src/api';



const getMockStore = ( initialState ) => {
    
    return configureStore({
        reducer: {
            authStore: authSlice.reducer
        },
        preloadedState: {
            authStore: { ...initialState }
        }
    });
   
}

describe( 'Pruebas en el useAuthStore', () => { 

    beforeEach( () => localStorage.clear() );
    
    test( 'Debe de regresar los valores por defecto', () => { 
        
        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook( useAuthStore, {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        expect( result.current ).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined,
            checkAuthToken: expect.any( Function ),
            startLogin: expect.any( Function ),
            startLogout: expect.any( Function ),
            startRegister: expect.any( Function ),
        });
        
    });

    test( 'startLogin debe de realizar el login correctamente', async () => { 
        
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook( useAuthStore, {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        await act( async () => {
           await result.current.startLogin( testUserCredentials );
        });
        
        const { status, user, errorMessage } = result.current;

        expect({ status, user, errorMessage }).toEqual({
            status: 'authenticated',
            user: { name: 'Leandro', uid: '6710410835b80e4ac86ba965' },
            errorMessage: undefined,
        });

        expect( localStorage.getItem( 'token' ) ).toEqual( expect.any( String ) );
        expect( localStorage.getItem( 'token-init-time' ) ).toEqual( expect.any( String ) );

    });

    test( 'startLogin debe de fallar la autenticacion', async () => { 
        
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook( useAuthStore, {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        await act( async () => {
           await result.current.startLogin({ email: 'noregistrado@google.com', email: '1424324234' });
        });

        const { status, user, errorMessage } = result.current;

        expect({ status, user, errorMessage }).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: 'Credenciales no validas',
        });
        expect( localStorage.getItem( 'token' ) ).toBe( null );

        await waitFor( () => expect( result.current.errorMessage ).toBe( undefined ) );
        
    });

    test( 'startRegister debe de crear un usuario', async () => { 
        
        const newUser = { email: 'algo@google.com', password: '3738281', name: 'Test User nro2' };

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook( useAuthStore, {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        //? Espia el post pero no deja que se haga el registro en la bd.
        const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue({
            data: {
                ok: true,
                uid: 'AnyNumber',
                name: 'Test User nro2',
                toke: 'AnyToken',
            }
        });

        await act( async () => {
           await result.current.startRegister( newUser );
        });

        const { status, user, errorMessage } = result.current;

        expect({ status, user, errorMessage }).toEqual({
            status: 'authenticated',
            user: { name: 'Test User nro2', uid: 'AnyNumber' },
            errorMessage: undefined
        });
        
        //? Elimina el mock en el calendarApi para poder hacer otro spy luego si lo necesitamos.
        spy.mockRestore();

    });

    test( 'startRegister debe fallar la creacion', async () => { 
        
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook( useAuthStore, {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        await act( async () => {
           await result.current.startRegister( testUserCredentials );
        });

        const { status, user, errorMessage } = result.current;

        expect({ status, user, errorMessage }).toEqual({
            errorMessage: 'Un usuario existe con ese correo',
            status: 'not-authenticated',
            user: {},
        });
        
    });

    test( 'checkAuthToken debe fallar si no hay token', async () => { 
        
        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook( useAuthStore, {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        await act( async () => {
           await result.current.checkAuthToken();
        });

        const { status, user, errorMessage } = result.current;

        expect({ status, user, errorMessage }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        });
        
    });

    test( 'checkAuthToken debe de autenticar el usuario si hay un token', async () => { 
        
        const { data } = await calendarApi.post( '/auth', testUserCredentials );
        localStorage.setItem( 'token', data.token );

        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook( useAuthStore, {
            wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
        });

        await act( async () => {
           await result.current.checkAuthToken();
        });

        const { status, user, errorMessage } = result.current;

        expect({ status, user, errorMessage }).toEqual({
            status: 'authenticated',
            user: { name: 'Leandro', uid: '6710410835b80e4ac86ba965' },
            errorMessage: undefined
        });
        
    });
    
});