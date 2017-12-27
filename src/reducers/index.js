import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import StockSearchReducer from './StockSearchReducer';
import StatReducer from './StatReducer';
import BuyStocksReducer from './BuyStocksReducer';

export default combineReducers({ 
	auth: AuthReducer,
	search: StockSearchReducer,
	stats: StatReducer,
	buy: BuyStocksReducer
});
