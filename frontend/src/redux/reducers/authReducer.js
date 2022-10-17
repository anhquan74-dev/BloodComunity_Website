import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR } from '../actions/types';
import { toast } from 'react-toastify';

const INITIAL_STATE = {
    // isExistsEmail: '',
    register: {
        isLoading: false,
        isError: false,
        status: '',
        message: '',
    },
    login: {
        currentUser: null,
        isLoading: false,
        isError: false,
    },
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                register: {
                    isLoading: true,
                    isError: false,
                    isSuccess: false,
                },
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                register: {
                    isLoading: false,
                    isError: false,
                    status: action.payload.content.statusCode,
                    message: action.payload.content.message,
                },
            };
        case REGISTER_ERROR:
            return {
                ...state,
                register: {
                    isLoading: false,
                    isError: true,
                    status: action.payload.error.response.data.statusCode,
                    message: action.payload.error.response.data.message,
                },
            };
        default:
            return state;
    }
};

export default authReducer;
