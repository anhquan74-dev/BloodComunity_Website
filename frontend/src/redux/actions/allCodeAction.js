import axios from 'axios';
import { FETCH_ALLCODE_SCHEDULE_TIME_FAILED, FETCH_ALLCODE_SCHEDULE_TIME_REQUEST, FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS } from './types';
export const fetchAllTimeTypes = () => {
    return async (dispatch, getState) => {
        dispatch(fetchTimeTypesRequest());
        try {
            const res = await axios.get('http://localhost:8080/api/allcode', { params: { type: 'TIME' } });
            const data = res && res.data ? res.data : [];
            console.log(data.content);
            dispatch(fetchTimeTypesSuccess(data));
        } catch (error) {
            console.log(error);
            dispatch(fetchTimeTypesError(error));
        }
    };
};
export const fetchTimeTypesRequest = () => {
    return {
        type: FETCH_ALLCODE_SCHEDULE_TIME_REQUEST,
    };
};

export const fetchTimeTypesSuccess = (payload) => {
    return {
        type: FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
        payload,
    };
};

export const fetchTimeTypesError = () => {
    return {
        type: FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
    };
};