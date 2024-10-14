import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/';


export const useCalendarStore = () => {
    
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendarStore );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async ( calendarEvent ) => {
        
        // TODO: llegar al backend

        if ( calendarEvent._id ) {
            //* Actualizar
            dispatch( onUpdateEvent({ ...calendarEvent }) );
        } else {
            //* Nuevo
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
        }
        
    }

    const startDeletingEvent = async () => {

        // TODO: llegar al backend
        dispatch( onDeleteEvent() );
    }
    
    return {
        //* Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* Methods
        setActiveEvent,
        startDeletingEvent,
        startSavingEvent,
    }
    
}