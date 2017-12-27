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
	FETCH_STATS_SUCCESS_FOR_BUY
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
	console.log('this runs');

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/stats`)
			.on('value', snapshot => {
				dispatch({ type: FETCH_STATS_SUCCESS, payload: snapshot.val() });
			});
	};
};

export const sendStatsForBuy = () => {
	const { currentUser } = firebase.auth();
	console.log('this runs');

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/stats`)
			.on('value', snapshot => {
				dispatch({ type: FETCH_STATS_SUCCESS_FOR_BUY, payload: snapshot.val() });
			});
	};
};

export const searchStock = ({ symbol }) => {
	console.log('searchStock action');
	console.log('symbol', symbol);

	return (dispatch) => {
		const request = axios.post('http://localhost:3000/api/v1/searches/search', { symbol })
			.then((response) => {
				dispatch({ type: SEARCH_STOCK });
				console.log('request', response);

				searchStockSuccess(dispatch, response.data);
				console.log('dispatch', dispatch);
			})
			.catch(() => {
				searchStockFail(dispatch);
				console.log('request', request);
			});
	};
};

export const setUserCapital = () => {
	const { currentUser } = firebase.auth();
	console.log('currentUser', currentUser);

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/stats`)
			.push({ cash: 100000, email: currentUser.email })
			.then((response) => {
				dispatch({ type: SET_USER_CAPITAL });
				setUserCapitalSuccess(dispatch, response);
				Actions.ready();
			})
			.catch(() => setUserCapitalFail(dispatch));
	};
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
