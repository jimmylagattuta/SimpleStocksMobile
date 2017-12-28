import {
	BUY_STOCKS_TRAITS,
	FETCH_STATS_SUCCESS_FOR_BUY,
	QUANTITY_CHANGED,
	BUY_STOCKS,
	BUY_STOCKS_SUCCESS,
	BUY_STOCKS_FAIL_CASH,
	CASH_SAVE_SUCCESS,
	STAT_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
	toBuySymbol: '',
	toBuyName: '',
	toBuyPPS: 0.00,
	loading: '',
	error: '',
	cash: 0.00,
	quantity: 0,
	loadingBuyStocks: false,
	errorBuyStocks: ''
};

export default (state = INITIAL_STATE, action) => {
	console.log('BuyStocksReducer', action.payload);

	switch (action.type) {
		case BUY_STOCKS_TRAITS:
			return {
				...state,
				toBuySymbol: action.payload.jsonSymbol,
				toBuyName: action.payload.jsonName,
				toBuyPPS: action.payload.jsonPricePerShare
			};
		case FETCH_STATS_SUCCESS_FOR_BUY: 
			return { ...state, cash: action.payload.cash };
		case QUANTITY_CHANGED:
			return { ...state, quantity: action.payload };
		case BUY_STOCKS:
			return { ...state, loadingBuyStocks: true, errorBuyStocks: '' };
		case BUY_STOCKS_FAIL_CASH:
			return { ...state, loadingBuyStocks: false, errorBuyStocks: 'Exceeds Your Budget' };
		case CASH_SAVE_SUCCESS:
			return { ...state, loadingBuyStocks: false, errorBuyStocks: '', quantity: 0 };
		case STAT_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		default:
			return state;
	}
};
