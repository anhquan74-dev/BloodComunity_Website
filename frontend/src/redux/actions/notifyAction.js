import {
  FETCH_REQUEST_SUCCESS,
  FETCH_REQUEST_EACH_RECIPIENT_SUCCESS,
  MOVE_REQUEST_SUCCESS,
  FETCH_NOTIFY_FOR_RECIPIENT_SUCCESS,
} from './types';
import axios from 'axios';
import { DOMAIN_BACKEND } from '../../config/settingSystem';
export const getNotifyForRecipient = (recipientId) => {
  return async (dispatch) => {
      try {
        const resNotify = await axios.get(`${DOMAIN_BACKEND}/api/get-notify-by-recipient-id?recipientId=${recipientId}`)
          const data = resNotify && resNotify.data ? resNotify.data : [];
          dispatch(fetchNotifyForRecipientSuccess(data.content));
      } catch (error) {
          console.log(error);
      }
  };
};
export const fetchNotifyForRecipientSuccess = (payload) => {
  return {
      type: FETCH_NOTIFY_FOR_RECIPIENT_SUCCESS,
      payload,
  };
};

export const fetchRecipientRequest = (id) => {
  return async (dispatch) => {
      try {
          const res = await axios.get(`${DOMAIN_BACKEND}/api/get-all-request-by-recipient-id?id=${id}`);
          const data = res && res.data ? res.data : [];
          dispatch(fetchRequestOfEachRecipientSuccess(data.content));
      } catch (error) {
          console.log(error);
      }
  };
};

export const fetchRequestOfEachRecipientSuccess = (payload) => {
  return {
      type: FETCH_REQUEST_EACH_RECIPIENT_SUCCESS,
      payload,
  };
};

