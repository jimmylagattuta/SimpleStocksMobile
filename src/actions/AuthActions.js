import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	SIGNUP_EMAIL_CHANGED,
	SIGNUP_PASSWORD_CHANGED,
	SIGNUP_PASSWORD_CONFIRMATION_CHANGED,
	LOGIN_USER,
	SIGNUP_USER,
	LOGIN_USER_FAIL,
	LOGIN_USER_FAIL_SIGNUP,
	LOGIN_USER_FAIL_SIGNUP_CONFIRMATION,
	LOGIN_USER_SUCCESS
} from './types';

export const emailChanged = (text) => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	};
};

export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	};
};

export const signupEmailChanged = (text) => {
	return {
		type: SIGNUP_EMAIL_CHANGED,
		payload: text
	};
};

export const signupPasswordChanged = (text) => {
	return {
		type: SIGNUP_PASSWORD_CHANGED,
		payload: text
	};
};

export const signupPasswordConfirmationChanged = (text) => {
	return {
		type: SIGNUP_PASSWORD_CONFIRMATION_CHANGED,
		payload: text
	};
};

export const loginUser = ({ email, password }) => {
	console.log('loginUser action');
	console.log('email', email);

	return (dispatch) => {
		dispatch({ type: LOGIN_USER });

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
			.catch(() => loginUserFail(dispatch));
	};
};

export const signupUser = ({ signupEmail, signupPassword, signupPasswordConfirmation }) => {
	console.log('signupUser action');
	console.log('signupEmail', signupEmail);
	console.log('signupPassword', signupPassword);
	console.log('signupPasswordConfirmation', signupPasswordConfirmation);

	if (signupPassword === signupPasswordConfirmation) {
		console.log('EQUAL!');
		console.log('signupEmail', signupEmail);
		console.log('signupPassword', signupPassword);

		return (dispatch) => {
			dispatch({ type: SIGNUP_USER });

			firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPassword)
				// instead of loginUserSuccess(), send to checkPasswordConfirmation()
				.then(user => {
					loginUserSuccess(dispatch, user);
				})
				.catch(() => loginUserFailSignup(dispatch));
		};
	} else if (signupPassword !== signupPasswordConfirmation) {
		console.log('X NOT EQUAL!');
		console.log('signupEmail', signupEmail);
		console.log('signupPassword', signupPassword);
		return (dispatch) => {
			loginUserFailSignupConfirmation(dispatch);
		};
	}
};

const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});

	Actions.ready();
};

const loginUserFail = (dispatch) => {
	dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserFailSignup = (dispatch) => {
	dispatch({ type: LOGIN_USER_FAIL_SIGNUP });
};

const loginUserFailSignupConfirmation = (dispatch) => {
	dispatch({ type: LOGIN_USER_FAIL_SIGNUP_CONFIRMATION });
};
