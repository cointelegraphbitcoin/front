export const Login = (payload) => ({
	type: "LOGIN",
	payload,
});

export const Logout = () => ({
	type: "LOGOUT",
});

export const Toggle = (payload) => ({
	type: "TOGGLE",
	payload,
});
