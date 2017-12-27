import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';

class Buy extends Component {
	componentWillMount() {
		console.log('Buy, componentWillMount');
	}

	onPressHome() {
		Actions.ready();
	}

	render() {
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

export default Buy;