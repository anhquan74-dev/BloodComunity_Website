import {
  FETCH_REQUEST_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  listRequests: []
};

const requestReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case FETCH_REQUEST_SUCCESS:
          // state.listRequests.push(action.payload)
          return {
              ...state,
              listRequests: action.payload,
          };
      default:
          return state;
  }
};
export default requestReducer;
