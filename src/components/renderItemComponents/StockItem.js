import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from '../common';

class StockItem extends Component {
	componentWillMount() {
		console.log('componentWillMount StockItem');
	}

	render() {
		console.log('StockItems this.props', this.props);

		if (this.props.stockObject.symbol) {
			return (
				<View>
					<Text> Symbol: {this.props.stockObject.symbol} </Text>
					<Text> Company: {this.props.stockObject.name} </Text>
					<Text> Price Per Share: {this.props.stockObject.price_per_share} </Text>
					<Text> Loss/Gain: {this.props.stockObject.loss_or_gain} </Text>
					<Text> Open: {this.props.stockObject.open} </Text>
					<Text> High: {this.props.stockObject.high} </Text>
					<Text> Low: {this.props.stockObject.low} </Text>
					<Button
						style={{ margin: 5 }}
						onPress={() => {
							this.props.buyStocksTraits(this.props.stockObject.symbol, this.props.stockObject.price_per_share);
							console.log('onPress, this.props.stockObject.symbol', 
								this.props.stockObject.symbol,
								'this.props.stockObject. price_per_share',
								this.props.stockObject.price_per_share);
						}}
					>
						Buy Shares
					</Button>
				</View>
			);		
		} else {
			return (
				<View>
					<Text />
				</View>
			);
		}
	}
}

export default StockItem;
