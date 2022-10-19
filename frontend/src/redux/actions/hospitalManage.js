import axios from 'axios';
// import axios from '../../utils/customizeAxios';

import {
    FETCH_HOSPITAL_ERROR,
    FETCH_HOSPITAL_REQUEST,
    FETCH_HOSPITAL_SUCCESS,
    CREATE_USER_ERROR,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    FETCH_SINGLE_HOSPITAL_SUCCESS,
    FETCH_SINGLE_HOSPITAL_ERROR,
    FETCH_SINGLE_HOSPITAL_REQUEST,
    UPDATE_HOSPITAL_REQUEST,
    UPDATE_HOSPITAL_SUCCESS,
    UPDATE_HOSPITAL_ERROR,
    DELETE_HOSPITAL_REQUEST,
    DELETE_HOSPITAL_SUCCESS,
    DELETE_HOSPITAL_ERROR,
} from './types';

// fetch all hospital
export const fetchAllHospital = () => {
    return async (dispatch, getState) => {
        dispatch(fetchHospitalRequest());
        try {
            const res = await axios.get('http://localhost:8080/api/get-user-by-type', { params: { type: 'R2' } });
            const data = res && res.data ? res.data : [];
            console.log(data);
            dispatch(fetchHospitalSuccess(data));
        } catch (error) {
            console.log(error);
            dispatch(fetchHospitalError(error));
        }
    };
};

export const fetchHospitalRequest = () => {
    return {
        type: FETCH_HOSPITAL_REQUEST,
    };
};

export const fetchHospitalSuccess = (payload) => {
    return {
        type: FETCH_HOSPITAL_SUCCESS,
        payload,
    };
};

export const fetchHospitalError = () => {
    return {
        type: FETCH_HOSPITAL_ERROR,
    };
};

// create new user account
export const createUser = (user) => {
    return async (dispatch, getState) => {
        dispatch(createUserRequest());
        try {
            const res = await axios.post('http://localhost:8080/api/create-new-user', user);
            console.log(user);
            const data = res && res.data ? res.data : [];
            console.log(data);
            dispatch(createUserSuccess(data));
            dispatch(fetchAllHospital());
        } catch (error) {
            console.log(error);
            dispatch(createUserError(error));
        }
    };
};

export const createUserRequest = () => {
    return {
        type: CREATE_USER_REQUEST,
    };
};

export const createUserSuccess = (payload) => {
    return {
        type: CREATE_USER_SUCCESS,
        payload,
    };
};

export const createUserError = (error) => {
    return {
        type: CREATE_USER_ERROR,
        payload: {
            error,
        },
    };
};

// get hospital by id
export const fetchHospitalById = (id) => {
    return async (dispatch, getState) => {
        dispatch(fetchHospitalByIdRequest());
        try {
            const res = await axios.get('http://localhost:8080/api/get-user-by-id', { params: { id: id } });
            const data = res && res.data ? res.data : [];
            console.log(data);
            dispatch(fetchHospitalByIdSuccess(data));
        } catch (error) {
            console.log(error);
            dispatch(fetchHospitalByIdError());
        }
    };
};

export const fetchHospitalByIdRequest = () => {
    return {
        type: FETCH_SINGLE_HOSPITAL_REQUEST,
    };
};

export const fetchHospitalByIdSuccess = (payload) => {
    return {
        type: FETCH_SINGLE_HOSPITAL_SUCCESS,
        payload,
    };
};

export const fetchHospitalByIdError = () => {
    return {
        type: FETCH_SINGLE_HOSPITAL_ERROR,
    };
};

// update Hospital
export const updateHospital = (hospital) => {
    return async (dispatch, getState) => {
        dispatch(updateHospitalRequest());
        try {
            const res = await axios.put('http://localhost:8080/api/update-user', hospital);
            const data = res && res.data ? res.data : [];
            dispatch(updateHospitalSuccess(data));
            dispatch(fetchAllHospital());
        } catch (error) {
            console.log(error);
            dispatch(updateHospitalError());
        }
    };
};

export const updateHospitalRequest = () => {
    return {
        type: UPDATE_HOSPITAL_REQUEST,
    };
};

export const updateHospitalSuccess = (payload) => {
    return {
        type: UPDATE_HOSPITAL_SUCCESS,
        payload,
    };
};

export const updateHospitalError = () => {
    return {
        type: UPDATE_HOSPITAL_ERROR,
    };
};

export const deleteHospital = (id) => {
    return async (dispatch, getState) => {
        dispatch(deleteHospitalRequest());
        try {
            console.log('dl', id);
            const res = await axios.delete('http://localhost:8080/api/delete-user', { data: { id } });
            const data = res && res.data ? res.data : [];
            console.log(data);
            dispatch(deleteHospitalSuccess(data));
            dispatch(fetchAllHospital());
        } catch (error) {
            console.log(error);
            dispatch(deleteHospitalError());
        }
    };
};

export const deleteHospitalRequest = () => {
    return {
        type: DELETE_HOSPITAL_REQUEST,
    };
};

export const deleteHospitalSuccess = (payload) => {
    return {
        type: DELETE_HOSPITAL_SUCCESS,
        payload,
    };
};

export const deleteHospitalError = () => {
    return {
        type: DELETE_HOSPITAL_ERROR,
    };
};
