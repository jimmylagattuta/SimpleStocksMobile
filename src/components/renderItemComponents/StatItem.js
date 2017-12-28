import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { sellStocksPage } from '../../actions';
import { CardSection, Card, Button, Spinner } from '../common';

class StatItem extends Component {
	onButtonPressSell() {
		console.log('onButtonPressSell Pressed!');
		console.log('props near sale', this.props);
		this.props.sellStocksPage(this.props.stat.stocks[0].symbol, this.props.stat.stocks[0].shares);
	}

	renderButtonSell() {
		if (this.props.loadingSell) {
			return <Spinner size="small" />;
		}

		return (
			<Button onPress={this.onButtonPressSell.bind(this)}>
				Sell Shares
			</Button>
		);
	}

	renderStocks() {
		console.log('renderStocks this.props', this.props);
		return (
			<Card key={this.props.stat.symbol}>
				<CardSection>
					<Text>
						Symbol: {this.props.stat.stocks[0].symbol}
					</Text>
				</CardSection>
				<CardSection>
					<Text>
						Shares: {this.props.stat.stocks[0].shares}
					</Text>
				</CardSection>
				<CardSection>
					{this.renderButtonSell(
						this.props.stat.stocks[0].symbol,
						this.props.stat.stocks[0].shares
					)}
				</CardSection>
			</Card>
		);
	}
	
	render() {
		const { stat } = this.props.stat;
		// console.log('listitem, thisprops.stat.cash', this.props.stat.cash);
		// console.log('listitem, thisprops.stat.email', this.props.stat.email);
		// console.log('this.props', this.props);
		if (this.props.stat.stockCapital) {
			return (
				<TouchableWithoutFeedback>
					<View>
						<CardSection>
							<Text
								style={
									styles.titleStyle
								}
							>
								Email: {this.props.stat.email} 
							</Text>
						</CardSection>
						<CardSection>
							<Text
								style={
									styles.titleStyle
								}
							>
								Cash: ${this.props.stat.cash.toFixed(2)}
							</Text>
						</CardSection>
						<CardSection>
							<Text
								style={
									styles.titleStyle
								}
							>
								Stock Capital ${this.props.stat.stockCapital.toFixed(2)}
							</Text>
						</CardSection>
						<CardSection>
							<Text>
								Your Stocks
							</Text>
							{this.renderStocks()}
						</CardSection>
					</View>
				</TouchableWithoutFeedback>
			);
		} else {
			return (
				<TouchableWithoutFeedback>
					<View>
						<CardSection>
							<Text
								style={
									styles.titleStyle
								}
							>
								Email: {this.props.stat.email} 
							</Text>
						</CardSection>
						<CardSection>
							<Text
								style={
									styles.titleStyle
								}
							>
								Cash: ${this.props.stat.cash.toFixed(2)}
							</Text>
						</CardSection>
					</View>
				</TouchableWithoutFeedback>
			);
		}
	}
}

const styles = {
	titleStyle: {
		fontSize: 18,
		paddingLeft: 15
	}
};

const mapStateToProps = ({ buy }) => {
	const { loadingSell } = buy;

	return { loadingSell };
};

export default connect(mapStateToProps, { sellStocksPage })(StatItem);
