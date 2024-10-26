import calendarApi from '../../src/api/calendarApi';


describe( 'Pruebas en CalendarApi', () => { 
    
    test( 'Debe de tener la configuracion por defecto', () => { 
        
        const url = process.env.VITE_API_URL;
        expect( calendarApi.defaults.baseURL ).toBe( url );
        
    });

    test( 'Debe de tener el x-token en el header de todas las peticiones', async () => { 
        
        const token = 'ABC-123-XYZ'
        localStorage.setItem( 'token', token );

        const res = await calendarApi.get( '/auth' );

        expect( res.config.headers['x-token'] ).toBe( token );
        
    });
    
});