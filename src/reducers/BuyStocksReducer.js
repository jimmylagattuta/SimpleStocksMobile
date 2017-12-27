import { BUY_STOCKS_TRAITS } from '../actions/types';

const INITIAL_STATE = {
	toBuySymbol: '',
	toBuyPPS: 0.00,
	loading: '',
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	console.log('BuyStocksReducer action', action);

	switch (action.type) {
		case BUY_STOCKS_TRAITS:
			return {
				...state,
				toBuySymbol: action.payload.jsonSymbol,
				toBuyPPS: action.payload.jsonPPS
			};
		default:
			return state;
	}
};
