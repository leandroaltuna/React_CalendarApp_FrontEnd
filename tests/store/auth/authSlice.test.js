import { authSlice, onClearErrorMessage, onLogin, onLogout } from '../../../src/store/auth/authSlice';
import { authenticatedState, initialState, notAuthenticatedState } from '../../fixtures/authStates';
import { testUserCredentials } from '../../fixtures/testUser';


describe( 'Pruebas en el authSlice', () => { 
    
    test( 'Debe de regresar el estado inicial', () => { 
        
        expect( authSlice.getInitialState() ).toEqual( initialState );
        
    });

    test( 'Debe de realizar un login', () => { 
        
        const state = authSlice.reducer( authenticatedState, onLogin( testUserCredentials ) );
        
        expect( state ).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined,
        });
        
    });

    test( 'Debe de realizar el logout', () => { 
        
        const state = authSlice.reducer( notAuthenticatedState, onLogout() );

        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined,
        });
        
    });

    test( 'Debe de realizar el logout with errorMessage', () => { 
        
        const errorMessage = 'Invalid Credentials';
        const state = authSlice.reducer( notAuthenticatedState, onLogout( errorMessage ) );

        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage,
        });
        
    });

    test( 'Debe de limpiar el mensaje de error', () => { 
        
        const errorMessage = 'Invalid Credentials';
        const state = authSlice.reducer( notAuthenticatedState, onLogout( errorMessage ) );
        const newState = authSlice.reducer( state, onClearErrorMessage );

        expect( newState.errorMessage ).toBe( undefined );
        
    });
    
});