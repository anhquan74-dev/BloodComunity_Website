import axios from 'axios';
// import axios from '../../utils/customizeAxios';

import {
    FETCH_HOSPITAL_ERROR,
    FETCH_HOSPITAL_REQUEST,
    FETCH_HOSPITAL_SUCCESS,
    CREATE_HOSPITAL_ERROR,
    CREATE_HOSPITAL_REQUEST,
    CREATE_HOSPITAL_SUCCESS,
    FETCH_SINGLE_HOSPITAL_SUCCESS,
    FETCH_SINGLE_HOSPITAL_ERROR,
    FETCH_SINGLE_HOSPITAL_REQUEST,
    UPDATE_HOSPITAL_REQUEST,
    UPDATE_HOSPITAL_SUCCESS,
    UPDATE_HOSPITAL_ERROR,
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

// create new Hospital account
export const createHospital = (hospital) => {
    return async (dispatch, getState) => {
        dispatch(createHospitalRequest());
        try {
            const res = await axios.post('http://localhost:8080/api/create-new-user', hospital);
            console.log(hospital);
            const data = res && res.data ? res.data : [];
            console.log(data);
            dispatch(createHospitalSuccess(data));
            dispatch(fetchAllHospital());
        } catch (error) {
            console.log(error);
            dispatch(createHospitalError(error));
        }
    };
};

export const createHospitalRequest = () => {
    return {
        type: CREATE_HOSPITAL_REQUEST,
    };
};

export const createHospitalSuccess = (payload) => {
    return {
        type: CREATE_HOSPITAL_SUCCESS,
        payload,
    };
};

export const createHospitalError = (error) => {
    return {
        type: CREATE_HOSPITAL_ERROR,
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
