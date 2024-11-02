import { MemoryRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { AppRouter } from '../../src/routes/AppRouter';
// import { CalendarPage } from '../../src/calendar';


jest.mock( '../../src/hooks/useAuthStore' );

//? Mock para renderizar el componente sin necesidad de tener que hacer un mock por cada hook dentro del componente.
// jest.mock( '../../src/calendar', () => {
//     CalendarPage: () => <h1>CalendarPage</h1>
// })


describe( 'Pruebas en <AppRouter />', () => { 
    
    const mockCheckAuthToken = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test( 'Debe de mostrar la pantalla carga y llamar el checkAuthToken', () => { 
        
        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken,
        });

        render( <AppRouter /> );

        expect( screen.getByText( 'Cargando...' ) ).toBeTruthy();
        expect( mockCheckAuthToken ).toHaveBeenCalled();

    });

    test( 'Debe de mostrar el login en caso de no estar autenticado', () => { 
        
        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken,
        });

        const { container } = render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        expect( screen.getByText( 'Ingreso' ) ).toBeTruthy();
        expect( container ).toMatchSnapshot();
        
    });

    // test( 'Debe de mostrar el calendario si estamos autenticados', () => { 
        
    //     useAuthStore.mockReturnValue({
    //         status: 'authenticated',
    //         checkAuthToken: mockCheckAuthToken,
    //     });

    //     render(
    //         <MemoryRouter>
    //             <AppRouter />
    //         </MemoryRouter>
    //     );

    //     expect( screen.getByText( 'CalendarPage' ) ).toBeTruthy();
        
    // });
    
});