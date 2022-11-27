import {
    CREATE_EVENT_SUCCESS,
    CREATE_SCHEDULES_FAILED,
    CREATE_SCHEDULES_SUCCESS,
    DELETE_EVENT_SUCCESS,
    DELETE_SCHEDULE_SUCCESS,
    FETCH_EVENTS_SUCCESS,
    FETCH_SCHEDULES_BYID_SUCCESS,
    UPDATE_EVENT_SUCCESS,
} from '../actions/types';
import { toast } from 'react-toastify';

const INITIAL_STATE = {
    listEvents: [],
    listSingleSchedules: [],
};

const hospitalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_SCHEDULES_SUCCESS:
            toast.success(action.payload.message);
            return state;
        case CREATE_SCHEDULES_FAILED:
            toast.error(action.payload.message);
            return state;
        case FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                listEvents: action.payload.content,
            };
        case CREATE_EVENT_SUCCESS:
            toast.success(action.payload.message);
            return {
                ...state,
            };
        case UPDATE_EVENT_SUCCESS:
            toast.success(action.payload.message);
            return {
                ...state,
            };
        case DELETE_EVENT_SUCCESS:
            toast.success(action.payload.message);
            return {
                ...state,
            };
        case FETCH_SCHEDULES_BYID_SUCCESS:
            return {
                ...state,
                listSingleSchedules: action.payload.content,
            };
        case DELETE_SCHEDULE_SUCCESS:
            toast.success(action.payload.message);
            return state;
        default:
            return state;
    }
};
export default hospitalReducer;
