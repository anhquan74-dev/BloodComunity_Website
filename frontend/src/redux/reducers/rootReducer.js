import { combineReducers } from 'redux';
import authReducer from './authReducer';
import statisticReducer from './statisticReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
    users: usersReducer,
    statistic: statisticReducer,
    auth: authReducer
});

export default rootReducer;
