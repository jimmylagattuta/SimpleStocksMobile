import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import StockSearchReducer from './StockSearchReducer';
import StatReducer from './StatReducer';

export default combineReducers({ 
	auth: AuthReducer,
	search: StockSearchReducer,
	stats: StatReducer
});
