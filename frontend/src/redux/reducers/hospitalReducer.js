import { FETCH_HOSPITAL_REQUEST, FETCH_HOSPITAL_SUCCESS, FETCH_HOSPITAL_ERROR, CREATE_HOSPITAL_ERROR, CREATE_HOSPITAL_REQUEST, CREATE_HOSPITAL_SUCCESS, FETCH_SINGLE_HOSPITAL_SUCCESS, FETCH_SINGLE_HOSPITAL_ERROR, FETCH_SINGLE_HOSPITAL_REQUEST } from '../actions/types';


const INITIAL_STATE = {
    listHospitals: [],
    hospital: {},
    isLoading: false,
    isError: false,
};

const hospitalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_HOSPITAL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case FETCH_HOSPITAL_SUCCESS:
            return {
                ...state,
                listHospitals: action.payload.content,
                isLoading: false,
                isError: false
            }
        case FETCH_HOSPITAL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case CREATE_HOSPITAL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case CREATE_HOSPITAL_SUCCESS:
            return {
                ...state,
                listHospitals: action.payload.content,
                isLoading: false,
                isError: false
            }
        case CREATE_HOSPITAL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case FETCH_SINGLE_HOSPITAL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case FETCH_SINGLE_HOSPITAL_SUCCESS:
            return {
                ...state,
                hospital: action.payload.content,
                isLoading: false,
                isError: false
            }
        case FETCH_SINGLE_HOSPITAL_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            return state
    }
};

export default hospitalReducer;