

export const events = [
    {
        id: '1',
        start: new Date('2024-01-22 15:00:00'),
        end: new Date('2024-01-22 17:00:00'),
        title: 'Cumple del Leandro',
        notes: 'notas del evento',
    },
    {
        id: '2',
        start: new Date('2024-01-01 15:00:00'),
        end: new Date('2024-01-01 17:00:00'),
        title: 'Cumple de Estefi',
        notes: 'notas de Estefi',
    }
];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
};

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: null,
};

export const calendarWithActiveEventState = {
    isLoadingEvents: true,
    events: [ ...events ],
    activeEvent: { ...events[0] },
};

