import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from '../common';

class StatItem extends Component {
	render() {
		const { stat } = this.props.stat;
		console.log('listitem, thisprops.stat.cash', this.props.stat.cash);
		console.log('listitem, thisprops.stat.email', this.props.stat.email);
		console.log('this.props', this.props);

		return (
			<TouchableWithoutFeedback>
				<View>
					<CardSection>
						<Text
							style={
								styles.titleStyle
							}
						>
							List Item Rendered ~> {this.props.stat.email}: ${this.props.stat.cash} 
						</Text>
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
