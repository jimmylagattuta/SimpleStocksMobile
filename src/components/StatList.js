import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, Text } from 'react-native';
import { CardSection } from './common';
import { fetchStats, setCashProp } from '../actions';
import StatItem from './renderItemComponents/StatItem';

class StatList extends Component {
	state = {
		page: ''
	}
	componentWillMount() {
		console.log('StatList');
		console.log('this.props', this.props);

		this.props.fetchStats();

		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {

		this.createDataSource(nextProps);
	}

	createDataSource({ stats }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(stats);
	}

	renderRow(stat) {
		// console.log('stat', stat);

		return <StatItem stat={stat} />;
	}

	render() {
		console.log('StatList render');
		console.log('this.props', this.props);
		if (this.props.stats[0] && this.props.noMoney === true) {
			if (this.props.stats[0].cash) {
				this.props.setCashProp();
			}
		}

		return (
			<ListView
				enableEmptySections
				dataSource={this.dataSource}
				renderRow={this.renderRow}
			/>
		);
	}
}

const mapStateToProps = state => {
	const stats = _.map(state.stats, (val, uid) => {
		return { ...val, uid };
	});

	return { stats };
};

export default connect(mapStateToProps, { fetchStats, setCashProp })(StatList);
