import jwt from "jsonwebtoken";

export const authReducer = (state = isAuthenticated(), action) => {
	switch (action.type) {
		case "LOGIN":
			state = true;
			return state;
		case "LOGOUT":
			localStorage.clear();
			state = false;
			return state;
		default:
			return state;
	}
};

const isAuthenticated = () => {
	let token = localStorage.getItem("auth-token");

	if (token) {
		let user = jwt.decode(token);
		if (Date.now() >= user.exp * 1000) {
			localStorage.clear();
			return false;
		}
		return true;
	}
	return false;
};

export const showSpinner = (state = false, action) => {
	if (action.payload) {
		return true;
	} else return false;
};
