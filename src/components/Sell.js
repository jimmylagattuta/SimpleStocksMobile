import _ from 'lodash';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchStats, quantitySellChanged, sellStocks } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class Sell extends Component {
	componentWillMount() {
		console.log('Sell');
		this.props.fetchStats();
	}

	onPressHome() {
		Actions.ready();
	}

	onPressSell() {
		console.log('onPressSell function');
		this.props.sellStocks(
			this.props.stats[0].stocks[0].symbol,
			this.props.quantitySell,
			this.props.stats[0].uid,
			this.props.stats[0].stocks[0].shares,
			this.props.stats[0].cash,
			this.props.stats[0].stockCapital,
			this.props.stats[0].email
		);
	}

	onQuantitySellChange(text) {
		this.props.quantitySellChanged(text);
	}

	renderError() {
		if (this.props.errorSelling) {
			return (
				<View
					style={{
						backgroundColor: 'white'
					}}
				>
					<Text style={styles.errorTextStyle}>
						{this.props.errorSelling}
					</Text>
				</View>
			);
		}
	}

	renderButton() {
		if (this.props.loadingSelling) {
			return <Spinner size="small" />;
		}

		return (
			<Button onPress={this.onPressSell.bind(this)}>
				Sell Shares
			</Button>
		);
	}

	render() {
		console.log('Sell props, ', this.props);
		return (
			<Card>
				<Text>
					Sell
				</Text>
				<CardSection>
					<Text>
						Cash: $
					</Text>
				</CardSection>

				<CardSection>
					<Text>
						Stock in Cart: symbol: 
					</Text>
				</CardSection>

				<CardSection>
					<Text>
						Price Per Share: $
					</Text>
				</CardSection>

				<CardSection>
					<Input 
						label="shares"
						placeholder="1000"
						onChangeText={this.onQuantitySellChange.bind(this)}
						value={this.props.quantitySell}
					/>
				</CardSection>

				{this.renderError()}

				<CardSection>
					{this.renderButton()}
				</CardSection>

				<CardSection>
					<Button onPress={this.onPressHome.bind(this)}>
						Home
					</Button>
				</CardSection>
			</Card>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
};

const mapStateToProps = state => {
	const { maxSell, cashSell, ppsSell, quantitySell, loadingSelling, errorSelling } = state.buy;
	const stats = _.map(state.stats, (val, uid) => {
		return { ...val, uid };
	});

	return { maxSell, cashSell, ppsSell, quantitySell, stats, loadingSelling, errorSelling };
};

export default connect(mapStateToProps, { fetchStats, quantitySellChanged, sellStocks })(Sell);
