import { combineReducers } from 'redux';
import allCodeReducer from './allCodeReducer';
import authReducer from './authReducer';
import statisticReducer from './statisticReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
    users: usersReducer,
    statistic: statisticReducer,
    auth: authReducer,
    allCode: allCodeReducer
});

export default rootReducer;
