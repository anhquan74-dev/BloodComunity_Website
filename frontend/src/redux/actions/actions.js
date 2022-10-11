// import axios from 'axios';
import axios from '../../utils/customizeAxios';

import { FETCH_HOSPITAL_ERROR, FETCH_HOSPITAL_REQUEST, FETCH_HOSPITAL_SUCCESS } from './types'

// start doing finish
export const fetchAllHospital = () => {
    return async (dispatch, getState) => {
        dispatch(fetchHospitalRequest());
        try {
            const res = await axios.get('get-all-doctors')
            const data = res && res.data ? res.data : []
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


