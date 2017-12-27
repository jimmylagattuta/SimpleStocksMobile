import React from 'react';
import { View, ScrollView } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Main from './components/Main';
import Welcome from './components/Welcome';
import Buy from './components/Buy';

const RouterComponent = () => {
	return (
		<Router>
			<View style={{ flex: 1 }}>
				<ScrollView>
					<Scene hideNavBar="true" key="root">
						<Scene key="auth">
							<Scene key="main" component={Main} title="Welcome To Simple Stocks" initial />
						</Scene>
						<Scene key="ready">
							<Scene key="welcome" component={Welcome} title="Home" initial />
						</Scene>
						<Scene key="buyhome">
							<Scene key="buy" component={Buy} title="Buy" initial />
						</Scene>
					</Scene>
				</ScrollView>
			</View>
		</Router>
	);
};

export default RouterComponent;
