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
	FETCH_STATS_SUCCESS
} from './types';

export const symbolChanged = (text) => {
	return {
		type: SYMBOL_CHANGED,
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

export const searchStock = ({ symbol }) => {
	console.log('searchStock action');
	console.log('symbol', symbol);

	return (dispatch) => {
		const request = axios.post('http://localhost:3000/api/v1/searches/search', { symbol })
			.then((response) => {
				dispatch({ type: SEARCH_STOCK });
				searchStockSuccess(dispatch, response);
				console.log('request', response);
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
			.push({ cash: 100000 })
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
		payload: response.data.content
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

// export const employeesFetch = () => {
// 	const { currentUser } = firebase.auth();

// 	return (dispatch) => {
// 		firebase.database().ref(`/users/${currentUser.uid}/employees`)
// 			.on('value', snapshot => {
// 				dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
// 		});
// 	};
// };
