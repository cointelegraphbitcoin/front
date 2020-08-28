import { createStore, combineReducers } from "redux";
import { authReducer, showSpinner } from "./reducers/authreducer";

const rootReducer = combineReducers({ authReducer, showSpinner });

export default createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
