import firebase from 'firebase';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
	BUY_STOCKS_TRAITS,
	QUANTITY_CHANGED,
	BUY_STOCKS,
	BUY_STOCKS_SUCCESS,
	BUY_STOCKS_FAIL_CASH,
	CASH_SAVE_SUCCESS,
	STAT_UPDATE
} from './types';

export const quantityChanged = (text) => {
	return {
		type: QUANTITY_CHANGED,
		payload: text
	};
};

export const buyStocksTraits = (symbol, name, pricePerShare) => {
	console.log('buyStockTraits!!!!!!!');
	console.log('symbol', symbol);
	console.log('pricePerShare', pricePerShare);

	const bundle = {
		jsonSymbol: symbol,
		jsonName: name,
		jsonPricePerShare: pricePerShare
	};

	return (dispatch) => {
		dispatch({ type: BUY_STOCKS_TRAITS, payload: bundle });
		Actions.buyhome();
	};
};

export const buyStocks = (pricePerShare, cash, quantity, symbol, email, uid) => {
	const { currentUser } = firebase.auth();
	const calculation = (pricePerShare * quantity);
	console.log('calculation', calculation.toFixed(2));
	console.log('pricePerShare,', pricePerShare);
	console.log('cash,', cash);
	const newCash = cash - calculation;
	console.log('quantity,', quantity);
	console.log('symbol,', symbol);
	console.log('email,', email);
	console.log('newCash,', newCash);
	const object = [{
		symbol: symbol,
		shares: quantity
	}];
	console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

	if (calculation > cash) {
		return (dispatch) => {
			dispatch({ type: BUY_STOCKS_FAIL_CASH });
		};
	} else if (calculation <= cash) {
		return (dispatch) => {
			dispatch({ type: BUY_STOCKS });
			firebase.database().ref(`/users/${currentUser.uid}/stats/${uid}`)
				.set({ cash: newCash, email, stockCapital: calculation, stocks: object })
				.then((response) => {
					console.log('response im looking at', response);
					// dispatch({ type: CASH_SAVE_SUCCESS });
					dispatch({ type: CASH_SAVE_SUCCESS });
					setStockCapital(calculation, symbol, quantity);

					// Actions.ready();

				});
			// saveStockCapital(pricePerShare, quantity);
			// saveStockCapitalDetails(symbol, pricePerShare, quantity);
		};
	}
};

const setStockCapital = (calculation, symbol, quantity) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/stats`)
			.push({ stockCapital: calculation })
			.then((response) => {
				console.log(response);
				setStockObject(symbol, quantity);
			});
	};
};

const setStockObject = (symbol, quantity) => {
	const { currentUser } = firebase.auth();
	const object = {
		stock: symbol,
		shares: quantity
	};

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/stats`)
			.push({ stocks: object })
			.then((response) => {
				console.log(response);
			});	
	};
};

export const statUpdate = ({ prop, value }) => {
	return {
		type: STAT_UPDATE,
		payload: { prop, value }
	};
};

const saveCashUpdate = (pricePerShare, newCash, quantity, uid) => {
	const calculation = (pricePerShare * quantity);
	console.log('uid,', uid);
	console.log('newCash,', newCash);
	const cash = newCash - calculation;
	console.log('cash,', cash);

	return (dispatch) => {
		console.log('cash save initiatied');
		firebase.database().ref(`/users/${currentUser.uid}/stats/${uid}`)
			.set({ cash })
			.then((response) => {
				console.log('response im looking at', response);
				// dispatch({ type: CASH_SAVE_SUCCESS });
				dispatch({ type: CASH_SAVE_SUCCESS });
			});
	};
};
