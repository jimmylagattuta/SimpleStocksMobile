import firebase from 'firebase';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { BUY_STOCKS_TRAITS } from './types';

export const buyStocksTraits = (symbol, pricePerShare) => {
	console.log('buyStockTraits!!!!!!!');
	console.log('symbol', symbol);
	console.log('pricePerShare', pricePerShare);

	const bundle = {
		jsonSymbol: symbol,
		jsonPricePerShare: pricePerShare
	};

	return (dispatch) => {
		dispatch({ type: BUY_STOCKS_TRAITS, payload: bundle });
	};
};
