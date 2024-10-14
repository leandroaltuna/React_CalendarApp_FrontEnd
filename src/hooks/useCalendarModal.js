import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';



export const useCalendarModal = ( activeEvent ) => {
    
    const [ formSubmitted, setFormSubmitted ] = useState( false );
    const [ formValues, setFormValues ] = useState({
        title: 'Leandro',
        notes: 'Altuna',
        start: new Date(),
        end: addHours( new Date(), 2 ),
    });

    const titleClass = useMemo(() => {
        
        if ( !formSubmitted ) return '';

        return ( formValues.title.length > 0 ) ? '' : 'is-invalid';

    }, [ formValues.title, formSubmitted ]);

    useEffect(() => {
        
        if ( activeEvent !== null ) {
            setFormValues({ ...activeEvent });
        }

    }, [ activeEvent ])

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    }

    const onDateChanged = ( event, changing ) => {
        setFormValues({
            ...formValues,
            [ changing ]: event,
        });
        
    }

    const onCloseModal = () => {
        console.log( 'cerrando modal' );
    }
    

    return {
        formSubmitted,
        formValues,
        onCloseModal,
        onDateChanged,
        onInputChanged,
        setFormSubmitted,
        setFormValues,
        titleClass,
    }

}