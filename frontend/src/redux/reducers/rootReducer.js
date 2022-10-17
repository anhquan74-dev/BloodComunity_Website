import { combineReducers } from 'redux';
import statisticReducer from './statisticReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
    users: usersReducer,
    statistic: statisticReducer,
});

export default rootReducer;
