import { 
	SYMBOL_CHANGED,
	SEARCH_STOCK,
	SEARCH_STOCK_SUCCESS,
	SEARCH_STOCK_FAIL,
	SET_USER_CAPITAL,
	SET_USER_CAPITAL_SUCCESS,
	SET_USER_CAPITAL_FAIL,
	LOGIN_USER_AFTER_SIGNUP,
	LOGIN_USER_AFTER_SIGNUP_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
	stockObject: [],
	symbol: '',
	loading: '',
	loadingCash: '',
	error: '',
	user: null,
	stats: []
};

export default (state = INITIAL_STATE, action) => {
	console.log('action', action);

	switch (action.type) {
		case SEARCH_STOCK:
			return { ...state, stockObject: action.payload, loading: true };
		case SEARCH_STOCK_SUCCESS:
			return { ...state, ...INITIAL_STATE };
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
		default:
			return state;
	}
};
