import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store';



export const useUiStore = () => {

    const dispatch = useDispatch();
    
    const { isDateModalOpen } = useSelector( state => state.uiStore );

    const openDateModal = () => {
        dispatch( onOpenDateModal() );
    }

    const closeDateModal = () => {
        dispatch( onCloseDateModal() );
    }

    const toggleDateModal = () => {

        ( isDateModalOpen )
        ? closeDateModal()
        : openDateModal();

    }

    return {

        //* Properties
        isDateModalOpen,

        //* Methods
        openDateModal,
        closeDateModal,
        toggleDateModal,

    }

}