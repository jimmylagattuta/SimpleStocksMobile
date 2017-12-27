import { BUY_STOCKS_TRAITS, FETCH_STATS_SUCCESS_FOR_BUY } from '../actions/types';

const INITIAL_STATE = {
	toBuySymbol: '',
	toBuyPPS: 0.00,
	loading: '',
	error: '',
	cash: 0.00
};

export default (state = INITIAL_STATE, action) => {
	console.log('BuyStocksReducer', action.payload);

	switch (action.type) {
		case BUY_STOCKS_TRAITS:
			return {
				...state,
				toBuySymbol: action.payload.jsonSymbol,
				toBuyPPS: action.payload.jsonPricePerShare
			};
		case FETCH_STATS_SUCCESS_FOR_BUY: 
		return { ...state, cash: action.payload.cash };
		default:
			return state;
	}
};
