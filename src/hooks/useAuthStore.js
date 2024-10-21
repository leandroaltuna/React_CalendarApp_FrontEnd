import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { onChecking, onClearErrorMessage, onLogin, onLogout } from '../store/auth';


export const useAuthStore = () => {
    
    const { status, user, errorMessage } = useSelector( state => state.authStore );
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        
        dispatch( onChecking() );

        try {
            
            const { data } = await calendarApi.post( '/auth', { email, password } );
            // console.log( data );
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-time', new Date().getTime() ); //* Establece el tiempo que fue creado el token para validar luego su duracion.

            dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {
            
            dispatch( onLogout( 'Credenciales no validas' ) );
            setTimeout(() => {
                dispatch( onClearErrorMessage() );
            }, 10);

        }

    }

    const startRegister = async ({ name, email, password }) => {
        
        dispatch( onChecking() );

        try {
            
            const { data } = await calendarApi.post( '/auth/new', { name, email, password } );
            
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-time', new Date().getTime() ); //* Establece el tiempo que fue creado el token para validar luego su duracion.

            dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {
            
            dispatch( onLogout( error.response.data?.msg || 'Verificar Informacion' ) );
            setTimeout(() => {
                dispatch( onClearErrorMessage() );
            }, 10);

        }

    }

    const checkAuthToken = async () => {
        
        const token = localStorage.getItem( 'token' );
        if ( !token ) return dispatch( onLogout() );

        try {
            
            const { data } = await calendarApi.get( '/auth/renew' );
            console.log( data );

            localStorage.setItem( 'token', data.newToken );
            localStorage.setItem( 'token-init-time', new Date().getTime() ); //* Establece el tiempo que fue creado el token para validar luego su duracion.

            dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {
            
            localStorage.clear();
            dispatch( onLogout() );

        }

    }

    const startLogout = () => {
        
        localStorage.clear();
        dispatch( onLogout() );

    }


    return {

        //* Properties
        status, 
        user, 
        errorMessage,

        //* Methods
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,

    }

}