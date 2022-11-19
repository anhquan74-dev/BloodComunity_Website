import { combineReducers } from 'redux';
import authReducer from './authReducer';
import hospitalReducer from './hospitalReducer';
import statisticReducer from './statisticReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
    users: usersReducer,
    statistic: statisticReducer,
    auth: authReducer,
    hospital: hospitalReducer,
});

export default rootReducer;
