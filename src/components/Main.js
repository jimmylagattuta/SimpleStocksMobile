import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
	emailChanged,
	passwordChanged,
	signupEmailChanged,
	signupPasswordChanged,
	signupPasswordConfirmationChanged,
	loginUser,
	signupUser
} from '../actions';
import { Card, CardSection, Button, Input, Spinner } from './common';

class Main extends Component {
	componentWillMount() {
		console.log('Main');
		console.log('props ~>', this.props);
	}

	onEmailChange(text) {
		this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		this.props.passwordChanged(text);
	}

	onSignupEmailChange(text) {
		this.props.signupEmailChanged(text);
	}

	onSignupPasswordChange(text) {
		this.props.signupPasswordChanged(text);
	}

	onSignupPasswordConfirmationChange(text) {
		this.props.signupPasswordConfirmationChanged(text);
	}

	onButtonPress() {
		const { email, password } = this.props;
		this.props.loginUser({ email, password });
	}

	onButtonSignupPress() {
		const { signupEmail, signupPassword, signupPasswordConfirmation } = this.props;
		this.props.signupUser({ signupEmail, signupPassword, signupPasswordConfirmation });
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}

		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				Login
			</Button>
		);
	}

	renderButtonSignup() {
		if (this.props.loadingSignup) {
			return <Spinner size="large" />;
		}

		return (
			<Button onPress={this.onButtonSignupPress.bind(this)}>
				Create Account
			</Button>
		);
	}

	renderError() {
		if (this.props.error) {
			return (
				<View
					style={{
						backgroundColor: 'white'
					}}
				>
					<Text style={styles.errorTextStyle}>
						{this.props.error}
					</Text>
				</View>
			);
		}
	}

	renderErrorSignup() {
		if (this.props.errorSignup) {
			return (
				<View
					style={{
						backgroundColor: 'white'
					}}
				>
					<Text style={styles.errorTextStyle}>
						{this.props.errorSignup}
					</Text>
				</View>
			);
		}
	}

	renderErrorSignupConfirmation() {
		if (this.props.errorSignupConfirmation) {
			return (
				<View
					style={{
						backgroundColor: 'white'
					}}
				>
					<Text style={styles.errorTextStyle}>
						{this.props.errorSignupConfirmation}
					</Text>
				</View>
			);
		}
	}

	render() {
		return (
			<View>
				<Card>
					<CardSection>
						<Input
							label="Email"
							placeholder="email"
							onChangeText={this.onEmailChange.bind(this)}
							value={this.props.email}
						/>
					</CardSection>

					<CardSection>
						<Input
							secureTextEntry
							label="Password"
							placeholder="password"
							onChangeText={this.onPasswordChange.bind(this)}
							value={this.props.password}
						/>
					</CardSection>

					{this.renderError()}

					<CardSection>
						{this.renderButton()}
					</CardSection>

				</Card>

				<Card>
					<CardSection>
						<Input
							label="Email"
							placeholder="your@email"
							onChangeText={this.onSignupEmailChange.bind(this)}
							value={this.props.signupEmail}
						/>
					</CardSection>

					<CardSection>
						<Input
							secureTextEntry
							label="Password"
							placeholder="password"
							onChangeText={this.onSignupPasswordChange.bind(this)}
							value={this.props.signupPassword}
						/>
					</CardSection>

					<CardSection>
						<Input
							secureTextEntry
							label="Password Confirmation"
							placeholder="password"
							onChangeText={this.onSignupPasswordConfirmationChange.bind(this)}
							value={this.props.signupPasswordConfirmation}
						/>
					</CardSection>

					{this.renderErrorSignup()}
					{this.renderErrorSignupConfirmation()}

					<CardSection>
						{this.renderButtonSignup()}
					</CardSection>
				</Card>
			</View>
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

const mapStateToProps = ({ auth }) => {
	const {
		email,
		password,
		signupEmail,
		signupPassword,
		signupPasswordConfirmation,
		error,
		errorSignup,
		errorSignupConfirmation,
		loading,
		loadingSignup
	} = auth;

	return {
		email,
		password,
		signupEmail,
		signupPassword,
		signupPasswordConfirmation,
		error,
		errorSignup,
		errorSignupConfirmation,
		loading,
		loadingSignup
	};
};

export default connect(mapStateToProps, {
	emailChanged,
	passwordChanged,
	signupEmailChanged,
	signupPasswordChanged,
	signupPasswordConfirmationChanged,
	loginUser,
	signupUser
})(Main);
