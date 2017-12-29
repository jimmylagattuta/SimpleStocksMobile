import { 
	SYMBOL_CHANGED,
	SEARCH_STOCK,
	SEARCH_STOCK_SUCCESS,
	SEARCH_STOCK_FAIL,
	SET_USER_CAPITAL,
	SET_USER_CAPITAL_SUCCESS,
	SET_USER_CAPITAL_FAIL,
	LOGIN_USER_AFTER_SIGNUP,
	LOGIN_USER_AFTER_SIGNUP_SUCCESS,
	FETCH_STATS_SUCCESS_STOCK_SEARCH_REDUCER,
	RENDER_MONEY_TRUE,
	RENDER_MONEY_FALSE
} from '../actions/types';

const INITIAL_STATE = {
	stockObject: [],
	symbol: '',
	loading: '',
	loadingCash: '',
	loadingSearch: false,
	noMoney: true,
	error: '',
	user: null,
	money: false
};

export default (state = INITIAL_STATE, action) => {
	// console.log('action', action);

	switch (action.type) {
		case SEARCH_STOCK:
			return { ...state, symbol: '', loading: true };
		case SEARCH_STOCK_SUCCESS:
			return { ...state, stockObject: action.payload, loading: false };
		case SEARCH_STOCK_FAIL:
			return { ...state, error: 'Something Went Wrong', loading: false };
		case SYMBOL_CHANGED:
			return { ...state, symbol: action.payload };
		case SET_USER_CAPITAL:
			return { ...state, loadingCash: true };
		case SET_USER_CAPITAL_SUCCESS:
			return { ...state, ...INITIAL_STATE, loadingCash: false };
		case SET_USER_CAPITAL_FAIL:
			return { ...state, error: 'There might have been a connection error' };
		case LOGIN_USER_AFTER_SIGNUP:
			return { ...state, loadingCash: true, error: '' };
		case LOGIN_USER_AFTER_SIGNUP_SUCCESS:
			return { ...state, ...INITIAL_STATE, loadingCash: false, user: action.payload };
		case FETCH_STATS_SUCCESS_STOCK_SEARCH_REDUCER:
			return { ...state, money: true };
		case RENDER_MONEY_TRUE:
			return { ...state, noMoney: false };
		case RENDER_MONEY_FALSE:
			return { ...state, noMoney: true };
		default:
			return state;
	}
};
