import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  FETCH_REQUEST_SUCCESS,
} from './types';
import axios from 'axios';

// export const registerAccount = (user) => {
//   return async (dispatch, getState) => {
//       dispatch(registerAccountRequest());
//       try {
//           const res = await axios.post('http://localhost:8080/api/create-new-user', user);
//           console.log(user);
//           const data = res && res.data ? res.data : [];
//           console.log(data);
//           dispatch(registerAccountSuccess(data));
//       } catch (error) {
//           console.log(error);
//           dispatch(registerAccountError(error));
//       }
//   };
// };

// export const registerAccountRequest = () => {
//   return {
//       type: REGISTER_REQUEST,
//   };
// };

// export const registerAccountSuccess = (payload) => {
//   return {
//       type: REGISTER_SUCCESS,
//       payload,
//   };
// };

// export const registerAccountError = (error) => {
//   return {
//       type: REGISTER_ERROR,
//       payload: {
//           error,
//       },
//   };
// };

export const fetchRequest = (groupBlood) => {
  return async (dispatch) => {
      try {
          const res = await axios.get(`http://localhost:8080/api/get-all-request-by-group-blood?groupBlood=${groupBlood}`);
          const data = res && res.data ? res.data : [];
          console.log("data fetch 1", data.content);
          dispatch(fetchRequestSuccess(data.content));
      } catch (error) {
          console.log(error);
      }
  };
};


export const fetchRequestSuccess = (payload) => {
  return {
      type: FETCH_REQUEST_SUCCESS,
      payload,
  };
};

