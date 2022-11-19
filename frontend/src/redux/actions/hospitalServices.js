import axios from 'axios';
import { FETCH_EVENTS_SUCCESS } from './types';

export const fetchAllEvents = () => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.get('http://localhost:8080/api/get-all-events');
            const data = res && res.data ? res.data : [];
            console.log(data);
            dispatch(fetchEventsSuccess(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const fetchEventsSuccess = (payload) => {
    return {
        type: FETCH_EVENTS_SUCCESS,
        payload,
    };
};
