import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from '../actions/types';
import { toast } from 'react-toastify';

const INITIAL_STATE = {
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
        status: '',
        message: '',
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
                },
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                register: {
                    isLoading: false,
                    isError: false,
                    status: action.payload.statusCode,
                    message: action.payload.message,
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
        case LOGIN_REQUEST:
            return {
                ...state,
                login: {
                    currentUser: null,
                    isLoading: true,
                    isError: false,
                },
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                login: {
                    currentUser: action.payload.content,
                    isLoading: false,
                    isError: false,
                },
            };
        case LOGIN_ERROR:
            return {
                ...state,
                login: {
                    currentUser: null,
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
