import { FETCH_EVENTS_SUCCESS } from '../actions/types';
import { toast } from 'react-toastify';

const INITIAL_STATE = {
    listEvents: [],
};

const hospitalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                listEvents: action.payload.content,
            };
        default:
            return state;
    }
};
export default hospitalReducer;
