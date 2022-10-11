import { combineReducers } from 'redux';
import hospitalReducer from './hospitalReducer';

const rootReducer = combineReducers({
    hospital: hospitalReducer,
});

export default rootReducer;