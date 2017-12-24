import React from 'react';
import { View, ScrollView } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Main from './components/Main';

const RouterComponent = () => {
	return (
		<Router>
			<View style={{ flex: 1 }}>
				<ScrollView>
					<Scene hideNavBar="true" key="root">
						<Scene key="auth">
							<Scene key="main" component={Main} title="Welcome To Simple Stocks" initial />
						</Scene>
					</Scene>
				</ScrollView>
			</View>
		</Router>
	);
};

export default RouterComponent;
