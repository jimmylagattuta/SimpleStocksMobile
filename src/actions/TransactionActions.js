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
	STAT_UPDATE,
	SELL_STOCKS_PAGE,
	SELL_STOCKS_PAGE_SUCCESS,
	SELL_STOCKS_PAGE_FAIL,
	QUANTITY_SELL_CHANGED,
	SELL_STOCKS,
	SELL_STOCKS_SUCCESS,
	SELL_STOCKS_FAIL
} from './types';

export const quantityChanged = (text) => {
	return {
		type: QUANTITY_CHANGED,
		payload: text
	};
};

export const quantitySellChanged = (text) => {
	return {
		type: QUANTITY_SELL_CHANGED,
		payload: text
	};
};

export const sellStocks = (symbol, shares, uid, sharesOwned, newCash, stockCap, email) => {
	console.log('symbol ,', symbol);
	console.log('shares ,', shares);
	console.log('uid ,', uid);
	console.log('sharesOwned ,', sharesOwned);
	console.log('newCash ,', newCash);
	console.log('stockCap ,', stockCap);
	console.log('email ', email);

	const bundle = {
		symbolJSON: symbol
	};
	return (dispatch) => {
		dispatch({ type: SELL_STOCKS });
		axios.post('https://simplestocksmobilestocksearch.herokuapp.com/api/v1/searches/toSell', bundle)
			.then((response) => {
				console.log('sellStocks response @.@ ', response.data);
				const pps = response.data.price_per_share;
				const calculation = pps * shares;
				const intShares = parseInt(shares);
				console.log('intShares, ', intShares);
				console.log('pps, ', pps);
				if (intShares > sharesOwned) {
						dispatch({ type: SELL_STOCKS_FAIL });
				} else {
					const calc = pps * shares;
					const cash = newCash + calc;
					const stockCapital = stockCap - calc;
					sellStocksSuccess(dispatch, cash, stockCapital, email, uid);
				}
			})
			.catch((error) => {
				console.log('error', error);
			});
	};
};

export const sellStocksPage = (symbol, shares) => {
	const bundle = {
		jsonSymbol: symbol,
		jsonShares: shares
	};

	console.log('bundle, ', bundle);

	return (dispatch) => {
		dispatch({ type: SELL_STOCKS_PAGE });
		axios.post('https://simplestocksmobilestocksearch.herokuapp.com/api/v1/searches/toSell', bundle)
			.then((response) => {
				console.log('sellStocksPage response, ', response);
				sellStockPageSuccess(dispatch, response);
			});
	};
};

export const buyStocksTraits = (symbol, name, pricePerShare) => {
	// console.log('buyStockTraits!!!!!!!');
	// console.log('symbol', symbol);
	// console.log('pricePerShare', pricePerShare);

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

export const statUpdate = ({ prop, value }) => {
	return {
		type: STAT_UPDATE,
		payload: { prop, value }
	};
};

export const buyStocks = (pricePerShare, cash, quantity, symbol, email, uid, id) => {
	const { currentUser } = firebase.auth();
	const calculation = (pricePerShare * quantity);
	const newCash = cash - calculation;
	const object = [{
		symbol: symbol,
		shares: quantity
	}];

	if (calculation > cash) {
		return (dispatch) => {
			dispatch({ type: BUY_STOCKS_FAIL_CASH });
		};
	} else if (calculation <= cash) {
		return (dispatch) => {
			dispatch({ type: BUY_STOCKS });
			buyStocksAPI(pricePerShare, cash, quantity, symbol, email, uid, id, dispatch);
		};
	}
};

const buyStocksAPI = (pricePerShare, cash, quantity, symbol, email, uid, id, dispatch) => {
	const calculation = (pricePerShare * quantity);
	const newCash = cash - calculation;
	console.log('buyStocksAPI pricePerShare ', pricePerShare);
	console.log('buyStocksAPI cash ', cash);
	console.log('buyStocksAPI quantity ', quantity);
	console.log('buyStocksAPI symbol ', symbol);
	console.log('buyStocksAPI email ', email);
	console.log('buyStocksAPI uid ', uid);
	console.log('buyStocksAPI id ', id);
	const bundle = {
		jsonPPS: pricePerShare,
		jsonCash: cash,
		jsonQuantity: quantity,
		jsonSymbol: symbol,
		jsonEmail: email,
		jsonUID: uid,
		jsonID: id
	};

	axios.post('https://simplestocksmobilestocksearch.herokuapp.com/api/v1/transactions/buy_stocks', bundle)
		.then((response) => {
			console.log('buyStocksAPI response ', response);
			dispatch({ type: CASH_SAVE_SUCCESS, payload: response });
			setStockCapital(calculation, symbol, quantity);
			Actions.ready({ type: 'reset' });
		})
		.catch((error) => console.log('error ', error));
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

const sellStocksSuccess = (dispatch, newCash, stockCap, email, uid) => {
	const { currentUser } = firebase.auth();

	firebase.database().ref(`/users/${currentUser.uid}/stats/${uid}`)
		.set({ cash: newCash, email, stockCapital: stockCap })
		.then((response) => {
			// console.log('response im looking at', response);
			// dispatch({ type: CASH_SAVE_SUCCESS });
			dispatch({ type: SELL_STOCKS_SUCCESS, payload: response });
			Actions.ready();
		});
};

const saveCashUpdate = (pricePerShare, newCash, quantity, uid) => {
	const calculation = (pricePerShare * quantity);
	// console.log('uid,', uid);
	// console.log('newCash,', newCash);
	const cash = newCash - calculation;
	// console.log('cash,', cash);

	return (dispatch) => {
		// console.log('cash save initiatied');
		firebase.database().ref(`/users/${currentUser.uid}/stats/${uid}`)
			.set({ cash })
			.then((response) => {
				// console.log('response im looking at', response);
				// dispatch({ type: CASH_SAVE_SUCCESS });
				dispatch({ type: CASH_SAVE_SUCCESS });
			});
	};
};

const sellStockPageSuccess = (dispatch, response) => {
	dispatch({ type: SELL_STOCKS_PAGE_SUCCESS, payload: response });
	Actions.sellhome();
};
