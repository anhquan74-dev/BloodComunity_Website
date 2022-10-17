import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR } from './types';
import axios from 'axios';

export const registerAccount = (user) => {
    return async (dispatch, getState) => {
        dispatch(registerAccountRequest());
        try {
            const res = await axios.post('http://localhost:8080/api/create-new-user', user);
            console.log(user);
            const data = res && res.data ? res.data : [];
            console.log(data);
            dispatch(registerAccountSuccess(data));
        } catch (error) {
            console.log(error);
            dispatch(registerAccountError(error));
        }
    };
};

export const registerAccountRequest = () => {
    return {
        type: REGISTER_REQUEST,
    };
};

export const registerAccountSuccess = (payload) => {
    return {
        type: REGISTER_SUCCESS,
        payload,
    };
};

export const registerAccountError = (error) => {
    return {
        type: REGISTER_ERROR,
        payload: {
            error,
        },
    };
};
