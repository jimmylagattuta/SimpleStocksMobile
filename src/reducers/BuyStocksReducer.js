import {
	BUY_STOCKS_TRAITS,
	FETCH_STATS_SUCCESS_FOR_BUY,
	QUANTITY_CHANGED,
	BUY_STOCKS,
	BUY_STOCKS_SUCCESS,
	BUY_STOCKS_FAIL_CASH,
	CASH_SAVE_SUCCESS,
	STAT_UPDATE,
	SELL_STOCKS_PAGE,
	SELL_STOCKS_PAGE_SUCCESS,
	SELL_STOCKS_PAGE_FAIL,
	QUANTITY_SELL_CHANGED,
	SELL_STOCKS,
	SELL_STOCKS_SUCCESS,
	SELL_STOCKS_FAIL
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
	errorBuyStocks: '',
	quantitySell: 0,
	cashSell: 0.00,
	maxSell: 0,
	ppsSell: 0.00,
	loadingSellProp: false,
	errorSellProp: '',
	loadingSelling: false,
	errorSelling: ''
};

export default (state = INITIAL_STATE, action) => {
	console.log('BuyStocksReducer action', action);

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
		case QUANTITY_SELL_CHANGED:
			return { ...state, quantitySell: action.payload };
		case BUY_STOCKS:
			return { ...state, loadingBuyStocks: true, errorBuyStocks: '' };
		case BUY_STOCKS_FAIL_CASH:
			return { ...state, loadingBuyStocks: false, errorBuyStocks: 'Exceeds Your Budget' };
		case CASH_SAVE_SUCCESS:
			return { ...state, loadingBuyStocks: false, errorBuyStocks: '', quantity: 0 };
		case STAT_UPDATE:
			return { ...state, [action.payload.prop]: action.payload.value };
		case SELL_STOCKS_PAGE:
			return { ...state, loadingSell: true, errorBuyStocks: '' };
		case SELL_STOCKS_PAGE_SUCCESS:
			return {
				...state,
				loadingSell: false,
				quantitySell: action.payload.data.jsonShares,
				maxSell: action.payload.data.jsonCalculation,
				ppsSell: action.payload.data.price_per_share,
				errorBuyStocks: ''
			};
		case SELL_STOCKS_PAGE_FAIL:
			return { ...state, errorBuyStocks: 'Exceends your shares.' };
		case SELL_STOCKS:
			return { ...state, loadingSelling: true, errorSelling: '' };
		case SELL_STOCKS_SUCCESS:
			return { ...state, errorBuyStocks: '', loadingSelling: false };
		case SELL_STOCKS_FAIL:
			return { ...state, errorSelling: 'Exceends your shares', loadingSelling: false };
		default:
			return state;
	}
};
