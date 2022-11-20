import axios from 'axios';
import { CREATE_EVENT_SUCCESS, CREATE_SCHEDULES_FAILED, CREATE_SCHEDULES_SUCCESS, DELETE_EVENT_SUCCESS, FETCH_EVENTS_SUCCESS, UPDATE_EVENT_SUCCESS } from './types';


export const createSchedule = (data) => {
    return async (dispatch) => {
        try{    
            const res = await axios.post('http://localhost:8080/api/create-schedule', data)
            dispatch(createSchedulesSuccess(res.data))
        }catch(e){
            dispatch(createSchedulesFail(e.response.data))
        }
    }
}
export const createSchedulesSuccess = (payload) => {
    return {
        type: CREATE_SCHEDULES_SUCCESS,
        payload,
    };
};export const createSchedulesFail = (payload) => {
    return {
        type: CREATE_SCHEDULES_FAILED,
        payload,
    };
};

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

export const createEvent = (event) => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.post('http://localhost:8080/api/create-event', event);
            const data = res && res.data ? res.data : [];
            console.log(data);
            dispatch(createEventSuccess(data));
            dispatch(fetchAllEvents(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const createEventSuccess = (payload) => {
    return {
        type: CREATE_EVENT_SUCCESS,
        payload,
    };
};

export const updateEvent = (event) => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.put('http://localhost:8080/api/update-event', event);
            const data = res && res.data ? res.data : [];
            console.log(data);
            dispatch(updateEventSuccess(data));
            dispatch(fetchAllEvents(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const updateEventSuccess = (payload) => {
    return {
        type: UPDATE_EVENT_SUCCESS,
        payload,
    };
};

export const deleteEvent = (id) => {
    return async (dispatch, getState) => {
        try {
            console.log(id);
            const res = await axios.delete('http://localhost:8080/api/delete-event', { data: { id } });
            const data = res && res.data ? res.data : [];
            console.log(data);
            dispatch(deleteEventSuccess(data));
            dispatch(fetchAllEvents(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const deleteEventSuccess = (payload) => {
    return {
        type: DELETE_EVENT_SUCCESS,
        payload,
    };
};