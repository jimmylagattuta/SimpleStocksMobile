import firebase from 'firebase';
import { ScrollView, Text } from 'react-native';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { symbolChanged, searchStock, setUserCapital, buyStocksTraits } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
import StatList from './StatList';
import StockItem from './renderItemComponents/StockItem';

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

	onPressBuyStocks() {
		Actions.buyhome();
	}

	renderButtonBuyStocks() {
		return (
			<Button onPress={this.onPressBuyStocks.bind(this)}>
				Buy Stocks
			</Button>
		);
	}

	renderButtonMoney() {
		if (this.props.money) {
			return (
				<Text>${this.props.money}</Text>
			);
		} else {
			if (this.props.loadingCash) {
				return <Spinner size="small" />;
			}

			return (
				<Button onPress={this.onButtonPressMoney.bind(this)}>
					Start Buying Stocks
				</Button>
			);
		}
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

	renderStockSearch() {
		console.log('renderStockSearch, sending to StockItem');
		console.log('this.props.stockObject', this.props.stockObject);

		return (
			<StockItem
				stockObject={this.props.stockObject}
				buyStocksTraits={this.props.buyStocksTraits}
			/>
		);
	}

	render() {
		return (
			<Card style={{ flex: 1 }}>
				<ScrollView>
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

					<CardSection>
						{this.renderStockSearch()}
					</CardSection>

					<CardSection>
						{this.renderButtonBuyStocks()}
					</CardSection>
				</ScrollView>
			</Card>
		);
	}
}

const mapStateToProps = ({ search }) => {
	const { symbol, stockObject, loading, loadingCash, loadingSearch } = search;

	return { symbol, stockObject, loading, loadingCash, loadingSearch };
};

export default connect(mapStateToProps, { 
		symbolChanged,
		searchStock,
		setUserCapital,
		buyStocksTraits 
})(Welcome);

// days percentage c
// c: "-3.51"

// current asking
// l: "1,060.12"
