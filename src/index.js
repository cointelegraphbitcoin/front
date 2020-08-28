import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import SignUp from "./views/Signup";
import Signin from "./views/Signin";
import AdminLayout from "layouts/Admin/Admin.js";
import Home from "./views/Home";
import PageNotFound from "./views/PageNotFound";
import Comingsoon from "views/Comingsoon";
import About from "views/About";
import Contact from "views/Contact";
import Footer from "./components/Footer/Footer";
import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "assets/css/custom.css";
import Store from "./store";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import Spinner from "./components/spinner";

const hist = createBrowserHistory();

const DashboardRoute = (props) => {
	const select = useSelector((state) => {
		console.log(state);

		return state.authReducer;
	});
	return select ? <AdminLayout {...props} /> : <Redirect to="/signin" />;
};

const Main = () => {
	const showSpinner = useSelector((state) => {
		return state.showSpinner;
	});
	return (
		<main>
			<Router history={hist}>
				<Switch>
					<Route path="/" exact component={Comingsoon} />
					<Route path="/home" component={Home} history={hist} />
					<Route path="/signup" component={SignUp} />
					<Route path="/about" component={About} />
					<Route path="/contact" component={Contact} />
					<Route path="/signin" component={Signin} />
					<Route
						path="/dashboard"
						render={(props) => <DashboardRoute {...props} />}
					/>
					<Route path="*" exact={true} component={PageNotFound} />
				</Switch>
			</Router>
			<div>{showSpinner ? <Spinner /> : ""}</div>
			<div>
				<Footer />
			</div>
		</main>
	);
};

ReactDOM.render(
	<Provider store={Store}>
		<Main />{" "}
	</Provider>,
	document.getElementById("root")
);
