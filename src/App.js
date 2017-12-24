import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
	componentWillMount() {
		console.log('App ~> Simple Stocks Mobile');
		const config = {
			apiKey: 'AIzaSyCOszZU_A30Noad8kkIj19pVdLRYGjoaD0',
			authDomain: 'simplestocksmobile-fa09c.firebaseapp.com',
			databaseURL: 'https://simplestocksmobile-fa09c.firebaseio.com',
			projectId: 'simplestocksmobile-fa09c',
			storageBucket: '',
			messagingSenderId: '403366220756'
		};
		firebase.initializeApp(config);
	}

	render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default App;
