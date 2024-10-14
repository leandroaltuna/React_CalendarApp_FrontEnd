import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store/ui';



export const useUiStore = () => {

    const dispatch = useDispatch();
    
    const { isDateModalOpen } = useSelector( state => state.uiStore );

    const openDateModal = () => {
        dispatch( onOpenDateModal() );
    }

    const closeDateModal = () => {
        dispatch( onCloseDateModal() );
    }

    return {

        //* Properties
        isDateModalOpen,

        //* Methods
        openDateModal,
        closeDateModal,
    }

}