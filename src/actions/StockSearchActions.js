import firebase from 'firebase';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
	SYMBOL_CHANGED,
	SEARCH_STOCK,
	SEARCH_STOCK_SUCCESS,
	SEARCH_STOCK_FAIL,
	SET_USER_CAPITAL,
	SET_USER_CAPITAL_SUCCESS,
	SET_USER_CAPITAL_FAIL,
	FETCH_STATS_SUCCESS,
	BUY_STOCKS_SUCCESS,
	QUATITTY_CHANGED,
	FETCH_STATS_SUCCESS_FOR_BUY,
	RENDER_MONEY_TRUE,
	RENDER_MONEY_FALSE,
	START_BUY_STOCKS_CLEAR
} from './types';

export const symbolChanged = (text) => {
	return {
		type: SYMBOL_CHANGED,
		payload: text	
	};
};

export const quantityOfStock = (text) => {
	return {
		type: QUATITTY_CHANGED,
		payload: text
	};
};

export const fetchStats = () => {
	const { currentUser } = firebase.auth();
	// console.log('this runs');

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/stats`)
			.on('value', snapshot => {
				dispatch({ type: FETCH_STATS_SUCCESS, payload: snapshot.val() });
				setCashProp(dispatch, snapshot.val());
			});
	};
};

export const setCashProp = (stats) => {
	console.log('stats im looking at ,', stats);

	return (dispatch) => {
		dispatch({ type: RENDER_MONEY_TRUE });
	};
};

export const sendStatsForBuy = () => {
	const { currentUser } = firebase.auth();
	const id = currentUser.rubyID;
	// console.log('this runs');
	const bundle = {
		rubyID: id
	};
	return (dispatch) => {
		axios.post('https://simplestocksmobilestocksearch.herokuapp.com/api/v1/users/cash', bundle)
			.then((response) => {
				dispatch({ type: FETCH_STATS_SUCCESS_FOR_BUY, payload: response });
			});
	};
};

export const searchStock = ({ symbol }) => {
	// console.log('searchStock action');
	// console.log('symbol', symbol);

	return (dispatch) => {
		const request = axios.post('https://simplestocksmobilestocksearch.herokuapp.com/api/v1/searches/search', { symbol })
			.then((response) => {
				dispatch({ type: SEARCH_STOCK });
				// console.log('request', response);

				searchStockSuccess(dispatch, response.data);
				// console.log('dispatch', dispatch);
			})
			.catch(() => {
				searchStockFail(dispatch);
				// console.log('request', request);
			});
	};
};

export const setUserCapital = (email, id) => {
	const { currentUser } = firebase.auth();
	// console.log('currentUser', currentUser);

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/stats`)
			.push({ cash: 100000, email: currentUser.email, rubyID: id })
			.then((response) => {
				apiSetCapital(currentUser.email, currentUser.uid, id, dispatch);
				Actions.ready();
			})
			.catch(() => setUserCapitalFail(dispatch));
	};
};

export const updateStocks = (id) => {
	console.log('updateStocks id', id);
	const bundle = {
		jsonID: id
	};

	return (dispatch) => {
		axios.post('https://simplestocksmobilestocksearch.herokuapp.com/api/v1/users/update_stocks', bundle)
			.then((response) => console.log('updateStocks response', response))
			.catch((error) => console.log('error', error));
	};
};

export const startBuyStocksClear = () => {
	return (dispatch) => {
		dispatch({ type: START_BUY_STOCKS_CLEAR });
	};
};

const apiSetCapital = (email, uid, id, dispatch) => {
	console.log('apiSetCapital email', email);
	console.log('apiSetCapital uid', uid);
	console.log('apiSetCapital id', id);
	const bundle = {
		jsonEmail: email,
		jsonUID: uid,
		jsonID: id
	};
	axios.post('https://simplestocksmobilestocksearch.herokuapp.com/api/v1/users/set_capital', bundle)
		.then((response) => {
			dispatch({ type: SET_USER_CAPITAL });
			console.log('apiSetCapital response', response);
			setUserCapitalSuccess(dispatch, response);
		})
		.catch((error) => console.log('error', error));
};

const searchStockSuccess = (dispatch, response) => {
		dispatch({
		type: SEARCH_STOCK_SUCCESS,
		payload: response
	});

	Actions.ready();
};

const searchStockFail = (dispatch) => {
	dispatch({ type: SEARCH_STOCK_FAIL });

	Actions.ready();
};

const setUserCapitalSuccess = (dispatch, response) => {
	dispatch({ type: SET_USER_CAPITAL_SUCCESS, payload: response });
};

const setUserCapitalFail = (dispatch) => {
	dispatch({ type: SET_USER_CAPITAL_FAIL });

	Actions.ready();
};


// export const buyStocks = (uid) => {
// 	const { currentUser } = firebase.auth();
// 	const cash = 0.00;

// 	return (dispatch) => {
// 		firebase.database().ref(`/users/${currentUser.uid}/stats/cash/${uid}`)
// 			.set({ cash })
// 			.then((response) => {
// 				dispatch({ type: BUY_STOCKS_SUCCESS, payload: response });
// 				Actions.ready({ type: 'reset' });
// 			});
// 	};
// };

// export const employeeSave = ({ name, phone, shift, uid }) => {
// 	const { currentUser } = firebase.auth();

// 	return (dispatch) => {
// 		firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
// 			.set({ name, phone, shift })
// 			.then(() => {
// 				dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
// 				Actions.main({ type: 'reset' });
// 			});
// 	};
// };

// export const employeesFetch = () => {
// 	const { currentUser } = firebase.auth();

// 	return (dispatch) => {
// 		firebase.database().ref(`/users/${currentUser.uid}/employees`)
// 			.on('value', snapshot => {
// 				dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
// 		});
// 	};
// };
