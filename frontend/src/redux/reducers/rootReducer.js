import { combineReducers } from 'redux';
import allCodeReducer from './allCodeReducer';
import authReducer from './authReducer';
import hospitalReducer from './hospitalReducer';
import notifyReducer from './notifyReducer';
import requestReducer from './requestReducer';
import statisticReducer from './statisticReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
    users: usersReducer,
    statistic: statisticReducer,
    auth: authReducer,
    hospital: hospitalReducer,
    allCode: allCodeReducer,
    request: requestReducer,
    notify: notifyReducer
});

export default rootReducer;
