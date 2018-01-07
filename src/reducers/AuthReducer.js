import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	SIGNUP_EMAIL_CHANGED,
	SIGNUP_PASSWORD_CHANGED,
	SIGNUP_PASSWORD_CONFIRMATION_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER_FAIL_SIGNUP,
	LOGIN_USER_FAIL_SIGNUP_CONFIRMATION,
	LOGIN_USER,
	SIGNUP_USER
} from '../actions/types';

const INITIAL_STATE = {
	email: '',
	password: '',
	signupEmail: '',
	signupPassword: '',
	signupPasswordConfirmation: '',
	user: null,
	error: '',
	errorSignup: '',
	errorSignupConfirmation: '',
	loading: false,
	loadingSignup: false
};

export default (state = INITIAL_STATE, action) => {
	// console.log('action', action);

	switch (action.type) {
		case EMAIL_CHANGED:
			return { ...state, email: action.payload };
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload };
		case SIGNUP_EMAIL_CHANGED:
			return { ...state, signupEmail: action.payload };
		case SIGNUP_PASSWORD_CHANGED:
			return { ...state, signupPassword: action.payload };
		case SIGNUP_PASSWORD_CONFIRMATION_CHANGED:
			return { ...state, signupPasswordConfirmation: action.payload };
		case LOGIN_USER:
			return { ...state, loading: true, error: '' };
		case SIGNUP_USER:
			return {
				...state,
				loadingSignup: true,
				error: '',
				errorSignup: '',
				errorSignupConfirmation: ''
			};
		case LOGIN_USER_SUCCESS:
			return { ...state, ...INITIAL_STATE, user: action.payload };
		case LOGIN_USER_FAIL:
			return { ...state, error: 'Authenication Failed', password: '', loading: false };
		case LOGIN_USER_FAIL_SIGNUP:
			return {
				...state,
				errorSignup: 'Try using a longer password',
				signupPassword: '',
				signupPasswordConfirmation: '',
				loading: false,
				loadingSignup: false
			};
		case LOGIN_USER_FAIL_SIGNUP_CONFIRMATION:
			return {
				...state,
				errorSignupConfirmation: "Passwords Didn't Match",
				errorSignup: '',
				signupPassword: '',
				signupPasswordConfirmation: '',
				loadingSignup: false
			};
		default:
			return state;	
	}
};
