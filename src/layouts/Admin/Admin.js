import React from "react";
import { Route, Switch } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import UserComponent from "../../views/UserAdminComponent";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
// import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { user as userRoute, admin as adminRoute } from "routes.js";
import logo from "assets/img/react-logo.png";
import jwt from "jsonwebtoken";

let routes;
var ps;

class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			backgroundColor: "blue",
			sidebarOpened:
				document.documentElement.className.indexOf("nav-open") !== -1,
		};
		let token = localStorage.getItem("auth-token");
		let admin = jwt.decode(token);
		if (token && admin.admin) {
			routes = adminRoute;
		} else {
			routes = userRoute;
		}
	}
	componentDidMount() {
		if (navigator.platform.indexOf("Win") > -1) {
			document.documentElement.className += " perfect-scrollbar-on";
			document.documentElement.classList.remove("perfect-scrollbar-off");
			ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
			let tables = document.querySelectorAll(".table-responsive");
			for (let i = 0; i < tables.length; i++) {
				ps = new PerfectScrollbar(tables[i]);
			}
		}
	}
	componentWillUnmount() {
		if (navigator.platform.indexOf("Win") > -1) {
			ps.destroy();
			document.documentElement.className += " perfect-scrollbar-off";
			document.documentElement.classList.remove("perfect-scrollbar-on");
		}
	}
	componentDidUpdate(e) {
		if (e.history.action === "PUSH") {
			if (navigator.platform.indexOf("Win") > -1) {
				let tables = document.querySelectorAll(".table-responsive");
				for (let i = 0; i < tables.length; i++) {
					ps = new PerfectScrollbar(tables[i]);
				}
			}
			document.documentElement.scrollTop = 0;
			document.scrollingElement.scrollTop = 0;
			this.refs.mainPanel.scrollTop = 0;
		}
	}
	// this function opens and closes the sidebar on small devices
	toggleSidebar = () => {
		document.documentElement.classList.toggle("nav-open");
		this.setState({ sidebarOpened: !this.state.sidebarOpened });
	};
	getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.layout === "/dashboard") {
				return (
					<Route
						path={prop.layout + prop.path}
						component={prop.component}
						key={key}
					/>
				);
			} else {
				return null;
			}
		});
	};
	handleBgClick = (color) => {
		this.setState({ backgroundColor: color });
	};
	getBrandText = (path) => {
		for (let i = 0; i < routes.length; i++) {
			if (
				this.props.location.pathname.indexOf(
					routes[i].layout + routes[i].path
				) !== -1
			) {
				return routes[i].name;
			}
		}
		return "HOME";
	};
	render() {
		return (
			<div className="wrapper">
				<Sidebar
					{...this.props}
					routes={routes}
					bgColor={this.state.backgroundColor}
					logo={{
						outterLink: "/",
						text: "Telegraphbtc",
						imgSrc: logo,
					}}
					toggleSidebar={this.toggleSidebar}
				/>
				<div
					className="main-panel"
					ref="mainPanel"
					data={this.state.backgroundColor}
				>
					<AdminNavbar
						{...this.props}
						brandText={this.getBrandText("/home")}
						toggleSidebar={this.toggleSidebar}
						sidebarOpened={this.state.sidebarOpened}
					/>
					<Switch>
						{this.getRoutes(routes)}
						<Route path="/dashboard/admin/:user" component={UserComponent} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default Admin;
