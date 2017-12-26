import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from '../common';

class StatItem extends Component {
	render() {
		const { stat } = this.props.stat;
		console.log('listitem, props.stat', stat);

		return (
			<TouchableWithoutFeedback>
				<View>
					<CardSection>
						<Text style={styles.titleStyle}>List Item rendered</Text>
					</CardSection>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = {
	titleStyle: {
		fontSize: 18,
		paddingLeft: 15
	}
};

export default StatItem;
