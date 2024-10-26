import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from '../../../src/store/calendar/calendarSlice';
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from '../../fixtures/calendarStates';


describe( 'Pruebas en el calendarSlice', () => { 
    
    test( 'Debe de regresar por defecto', () => { 
        
        const state = calendarSlice.getInitialState();

        expect( state ).toEqual( initialState );
        
    });
    
    test( 'onSetActiveEvent debe de activar el evento', () => { 
        
        const state = calendarSlice.reducer( calendarWithActiveEventState, onSetActiveEvent( events[0] ) );
        
        expect( state.activeEvent ).toEqual( events[0] ); 
        
    });

    test( 'onAddNewEvent debe de agregar el evento', () => { 
        
        const newEvent = {
            id: '3',
            start: new Date('2024-04-21 15:00:00'),
            end: new Date('2024-04-21 17:00:00'),
            title: 'Cumple de Yaretzi',
            notes: 'notas de Yaretzi',
        };

        const state = calendarSlice.reducer( calendarWithActiveEventState, onAddNewEvent( newEvent ) );
        
        expect( state.events ).toEqual([ ...events, newEvent ]);
        
    });

    test( 'onUpdateEvent debe de actualizar el evento', () => { 
        
        const updatedEvent = {
            id: '1',
            start: new Date('2024-04-26 15:00:00'),
            end: new Date('2024-04-26 17:00:00'),
            title: 'Cumple de Alex',
            notes: 'notas de Alex',
        };

        const state = calendarSlice.reducer( calendarWithActiveEventState, onUpdateEvent( updatedEvent ) );

        expect( state.events ).toContain( updatedEvent );
        
    });

    test( 'onDeleteEvent debe de borrar el evento activo', () => { 
        
        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() );
        
        expect( state.activeEvent ).toBeNull();
        expect( state.events ).not.toContain( events[0] );
        
    });

    test( 'onLoadEvents debe de establecer los eventos', () => { 
        
        const state = calendarSlice.reducer( initialState, onLoadEvents( events ) );
        
        expect( state.isLoadingEvents ).toBeFalsy();
        expect( state.events ).toEqual( events );

        const newState = calendarSlice.reducer( state, onLoadEvents( events ) );
        expect( newState.events.length ).toBe( events.length );
        
    });

    test( 'onLogoutCalendar debe de limpiar el estado', () => { 
        
        const state = calendarSlice.reducer( calendarWithEventsState, onLogoutCalendar() );
        
        expect( state ).toEqual( initialState );
        
    });

});