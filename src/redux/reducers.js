import { combineReducers } from 'redux';
import login from './login/reducer';
import budget from "./budget/reducer"


const rootReducer = combineReducers({
    login: login,
    budget: budget
});
export default rootReducer;