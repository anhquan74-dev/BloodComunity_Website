import axios from 'axios';
import { GET_TOTALDONATION, GET_TOTALDONOR, GET_TOTALRECIPIENT, GET_TOPDONORS } from './types';

export const getTotalDonation = () => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.get('http://localhost:8080/api/get-total-donation');
            const data = res && res.data ? res.data : [];
            console.log(data);
            dispatch(getTotalDonationSuccess(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const getTotalDonationSuccess = (data) => {
    return {
        type: GET_TOTALDONATION,
        payload: data,
    };
};

export const getTotalDonor = () => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.get('http://localhost:8080/api/get-total-donor');
            const data = res && res.data ? res.data : [];
            console.log(data);
            dispatch(getTotalDonorSuccess(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const getTotalDonorSuccess = (data) => {
    return {
        type: GET_TOTALDONOR,
        payload: data,
    };
};

export const getTotalRecipient = () => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.get('http://localhost:8080/api/get-total-recipient');
            const data = res && res.data ? res.data : [];
            console.log(data);
            dispatch(getTotalRecipientSuccess(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const getTotalRecipientSuccess = (data) => {
    return {
        type: GET_TOTALRECIPIENT,
        payload: data,
    };
};

export const getTopDonors = () => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.get('http://localhost:8080/api/get-top-donor');
            const data = res && res.data ? res.data : [];
            console.log(data);
            dispatch(getTopDonorsSuccess(data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const getTopDonorsSuccess = (data) => {
    return {
        type: GET_TOPDONORS,
        payload: data,
    };
};
