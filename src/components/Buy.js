import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ListView, View, Text } from 'react-native';
import { sendStatsForBuy, quantityChanged, buyStocks } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class Buy extends Component {
	componentWillMount() {
		console.log('Buy this.props @_@', this.props);
		this.props.sendStatsForBuy();
		// this.props.updateStocks();

		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps);
	}

	onPressHome() {
		Actions.ready();
	}

	onQuantityChange(text) {
		this.props.quantityChanged(text);
	}

	onButtonPressShares() {
		console.log('Buy props here ', this.props);
		// console.log('Buy pps,', this.props.toBuyPPS);
		// console.log('Buy cash,', this.props.stats[0].cash);
		// console.log('this.props.quantity', this.props.quantity);
		const cash = this.props.stats[0].cash;
		const quantity = this.props.quantity;
		const pricePerShare = this.props.toBuyPPS;
		const symbol = this.props.toBuySymbol;
		const uid = this.props.stats[0].uid;
		const email = this.props.stats[0].email;
		const id = this.props.stats[0].rubyID;
		// console.log('objectTwo,', objectTwo);

		this.props.buyStocks(pricePerShare, cash, quantity, symbol, email, uid, id);
	}

	createDataSource({ stats }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(stats);
	}

	renderErrorShares() {
		if (this.props.errorBuyStocks) {
			return (
				<View
					style={{
						backgroundColor: 'white'
					}}
				>
					<Text style={styles.errorTextStyle}>
						{this.props.errorBuyStocks}
					</Text>
				</View>
			);
		}
	}

	renderButtonShares() {
		if (this.loadingBuyStocks) {
			return <Spinner size="small" />;
		}

		return (
			<Button onPress={this.onButtonPressShares.bind(this)}>
				Buy Shares
			</Button>

		);
	}

	renderRow(stat) {
		// console.log('stat', stat);

		return <Text />;
	}

	render() {
		// console.log('render Buy this.props', this.props);
		// console.log('render this.props.stats[0]', this.props.stats[0]);
		// console.log('Buy pps,', this.props.toBuyPPS);
		// console.log('Buy cash,', this.props.stats[0].cash);
		// console.log('Buy quantity,', this.props.quantity);

		return (
			<Card>
				<CardSection>
					<Text>
						Cash: ${this.props.stats[0].cash}
					</Text>
				</CardSection>

				<CardSection>
					<Text>
						Stock in Cart: {this.props.toBuyName} symbol: {this.props.toBuySymbol}
					</Text>
				</CardSection>

				<CardSection>
					<Text>
						Price Per Share: ${this.props.toBuyPPS}
					</Text>
				</CardSection>

				<CardSection>
					<Input
						label="shares"
						placeholder="1000"
						onChangeText={this.onQuantityChange.bind(this)}
						value={this.props.quantity}
					/>
				</CardSection>

				{this.renderErrorShares()}

				<CardSection>
					{this.renderButtonShares()}
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
	const {
		toBuySymbol,
		toBuyName,
		toBuyPPS,
		quantity,
		loadingBuyStocks,
		errorBuyStocks
	} = state.buy;
	const stats = _.map(state.stats, (val, uid) => {
		return { ...val, uid };
	});

	return {
		stats,
		toBuySymbol,
		toBuyName,
		toBuyPPS,
		quantity,
		loadingBuyStocks,
		errorBuyStocks
	};
};

export default connect(mapStateToProps, { sendStatsForBuy, quantityChanged, buyStocks })(Buy);


			// <View>
			// 	<CardSection>
			// 		<Input
			// 			label="Name"
			// 			placeholder="Jane"
			// 			value={this.props.name}
			// 			onChangeText={text => this.props.employeeUpdate({ prop: 'name', value: text })}
			// 		/>
			// 	</CardSection>
			// 	<CardSection>
			// 		<Input 
			// 			label="Phone"
			// 			placeholder="555-555-5555"
			// 			value={this.props.phone}
			// 			onChangeText={text => this.props.employeeUpdate({ prop: 'phone', value: text })}
			// 		/>
			// 	</CardSection>

			// 	<CardSection>
			// 		<Text style={styles.pickerTextStyle}>Shift</Text>
			// 		<Picker
			// 			style={{ flex: 1, marginRight: 60 }}
			// 			selectedValue={this.props.shift}
			// 			onValueChange={value => this.props.employeeUpdate({ prop: 'shift', value })}
			// 		>
			// 			<Picker.Item label="Monday" value="Monday" />
			// 			<Picker.Item label="Tuesday" value="Tuesday" />
			// 			<Picker.Item label="Wednesday" value="Wednesday" />
			// 			<Picker.Item label="Thursday" value="Thursday" />
			// 			<Picker.Item label="Friday" value="Friday" />
			// 			<Picker.Item label="Saturday" value="Saturday" />
			// 			<Picker.Item label="Sunday" value="Sunday" />
			// 		</Picker>
			// 	</CardSection>
			// </View>
