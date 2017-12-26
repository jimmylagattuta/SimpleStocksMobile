import firebase from 'firebase';
import { Text } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { symbolChanged, searchStock, setUserCapital } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
import StatList from './StatList';

class Welcome extends Component {
	componentWillMount() {
		console.log('Welcome page');
		console.log('this.props', this.props);
	}

	onSymbolChange(text) {
		console.log('text', text);

		this.props.symbolChanged(text);
	}

	onButtonPressSymbol() {
		const { symbol } = this.props;
		console.log('symbol', symbol);
		
		this.props.searchStock({ symbol });
	}

	onButtonPressMoney() {
		const { currentUser } = firebase.auth();
		const email = currentUser.email;

		this.props.setUserCapital({ email });
	}

	renderButtonMoney() {
		if (this.props.loadingCash) {
			return <Spinner size="small" />;
		}

		return (
			<Button onPress={this.onButtonPressMoney.bind(this)}>
				Start Buying Stocks
			</Button>
		);
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}

		return (
			<Button onPress={this.onButtonPressSymbol.bind(this)}>
				Search
			</Button>
		);
	}

	renderStatList() {
		return (
			<StatList />
		);
	}

	render() {
		return (
			<Card>
				<Text>Welcome Screen</Text>
				<CardSection>
					<Input
						label="Search By Symbol"
						placeholder="symbol"
						onChangeText={this.onSymbolChange.bind(this)}
						value={this.props.symbol}
					/>
				</CardSection>

				<CardSection>
					{this.renderButton()}
				</CardSection>

				<CardSection>
					{this.renderButtonMoney()}
				</CardSection>

				<CardSection>
					{this.renderStatList()}
				</CardSection>				
			</Card>
		);
	}
}

const mapStateToProps = ({ search }) => {
	const { symbol, stockObject, loading, loadingCash } = search;

	return { symbol, stockObject, loading, loadingCash };
};

export default connect(mapStateToProps, { symbolChanged, searchStock, setUserCapital })(Welcome);

// days percentage c
// c: "-3.51"

// current asking
// l: "1,060.12"