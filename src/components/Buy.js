import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ListView, View, Text } from 'react-native';
import { sendStatsForBuy } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class Buy extends Component {
	componentWillMount() {
		console.log('Buy, componentWillMount');
		console.log('Buy this.props', this.props);
		// console.log('this.props.cash', this.props.cash);
		this.props.sendStatsForBuy();

		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps);
	}

	onPressHome() {
		Actions.ready();
	}

	createDataSource({ stats }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(stats);
	}


	renderRow(stat) {
		console.log('stat', stat);

		return <Text />;
	}


	render() {
		console.log('render Buy this.props', this.props);
		console.log('render this.props.stats[0]', this.props.stats[0]);

		return (
			<Card>
				<CardSection>
					<Text>
						Buy
					</Text>
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

const mapStateToProps = state => {
	const { toBuySymbol, toBuyPPS } = state.buy;
	const stats = _.map(state.stats, (val, uid) => {
		return { ...val, uid };
	});

	return { stats, toBuySymbol, toBuyPPS };
};

export default connect(mapStateToProps, { sendStatsForBuy })(Buy);
