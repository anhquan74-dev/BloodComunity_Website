import { FETCH_HOSPITAL_REQUEST, FETCH_HOSPITAL_SUCCESS, FETCH_HOSPITAL_ERROR } from '../actions/types';


const INITIAL_STATE = {
    listHospitals: [],
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
                listHospitals: action.payload,
                isLoading: false,
                isError: false
            }
        case FETCH_HOSPITAL_ERROR:
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