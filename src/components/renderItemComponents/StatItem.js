import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Card } from '../common';

class StatItem extends Component {
	renderStocks() {
		console.log('renderStocks this.props', this.props);
		return (
			this.props.stat.stocks.map(item =>
				<Card key={item.symbol}>
					<Text>
						Symbol: {item.symbol}
					</Text>
					<Text>
						Shares: {item.shares}
					</Text>
				</Card>
			)
		);
	}
	
	render() {
		const { stat } = this.props.stat;
		console.log('listitem, thisprops.stat.cash', this.props.stat.cash);
		console.log('listitem, thisprops.stat.email', this.props.stat.email);
		console.log('this.props', this.props);
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

export default StatItem;
