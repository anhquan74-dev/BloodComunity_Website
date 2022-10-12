import axios from 'axios';
// import axios from '../../utils/customizeAxios';

import {
    FETCH_HOSPITAL_ERROR, FETCH_HOSPITAL_REQUEST, FETCH_HOSPITAL_SUCCESS,
    CREATE_HOSPITAL_ERROR, CREATE_HOSPITAL_REQUEST, CREATE_HOSPITAL_SUCCESS,
    FETCH_SINGLE_HOSPITAL_SUCCESS, FETCH_SINGLE_HOSPITAL_ERROR, FETCH_SINGLE_HOSPITAL_REQUEST
} from './types'

// start doing finish
export const fetchAllHospital = () => {
    return async (dispatch, getState) => {
        dispatch(fetchHospitalRequest());
        try {
            const res = await axios.get('http://localhost:8080/api/get-all-users')
            const data = res && res.data ? res.data : []
            console.log(data);
            dispatch(fetchHospitalSuccess(data))
        } catch (error) {
            console.log(error)
            dispatch(fetchHospitalError())
        }
    }
}

export const fetchHospitalRequest = () => {
    return {
        type: FETCH_HOSPITAL_REQUEST
    }
}

export const fetchHospitalSuccess = (payload) => {
    return {
        type: FETCH_HOSPITAL_SUCCESS,
        payload
    }
}

export const fetchHospitalError = () => {
    return {
        type: FETCH_HOSPITAL_ERROR
    }
}

//create 
export const createHospital = (hospital) => {
    return async (dispatch, getState) => {
        dispatch(createHospitalRequest());
        try {
            const res = await axios.post('http://localhost:8080/api/create-new-user', hospital)
            const data = res && res.data ? res.data : []
            console.log(data);
            dispatch(createHospitalSuccess(data))
        } catch (error) {
            console.log(error)
            dispatch(createHospitalError())
        }
    }
}

export const createHospitalRequest = () => {
    return {
        type: CREATE_HOSPITAL_REQUEST
    }
}

export const createHospitalSuccess = (payload) => {
    return {
        type: CREATE_HOSPITAL_SUCCESS,
        payload
    }
}

export const createHospitalError = () => {
    return {
        type: CREATE_HOSPITAL_ERROR
    }
}


// get hospital by id
export const fetchHospitalById = (id) => {
    return async (dispatch, getState) => {
        dispatch(fetchHospitalByIdRequest());
        try {
            const res = await axios.get('http://localhost:8080/api/get-user-by-id', { params: { id: id } })
            const data = res && res.data ? res.data : []
            console.log(data);
            dispatch(fetchHospitalByIdSuccess(data))
        } catch (error) {
            console.log(error)
            dispatch(fetchHospitalByIdError())
        }
    }
}

export const fetchHospitalByIdRequest = () => {
    return {
        type: FETCH_SINGLE_HOSPITAL_REQUEST
    }
}

export const fetchHospitalByIdSuccess = (payload) => {
    return {
        type: FETCH_SINGLE_HOSPITAL_SUCCESS,
        payload
    }
}

export const fetchHospitalByIdError = () => {
    return {
        type: FETCH_SINGLE_HOSPITAL_ERROR
    }
}