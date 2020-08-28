import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Login, Logout } from "../../store/actions/auth";

// reactstrap components
import {
	Button,
	Collapse,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	Navbar,
	NavLink,
	NavItem,
	Nav,
	Container,
} from "reactstrap";

const mapStateToProps = (store) => ({
	auth: store.authReducer,
});
const mapDispatchToProps = (dispatch) => ({
	Login() {
		dispatch(Login());
	},
	Logout() {
		dispatch(Logout());
	},
});

class AdminNavbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapseOpen: false,
			modalSearch: false,
			color: "navbar-transparent",
		};
	}
	componentDidMount() {
		window.addEventListener("resize", this.updateColor);
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateColor);
	}
	// function that adds color white/transparent to the navbar on resize (this is for the collapse)
	updateColor = () => {
		if (window.innerWidth < 993 && this.state.collapseOpen) {
			this.setState({
				color: "bg-white",
			});
		} else {
			this.setState({
				color: "navbar-transparent",
			});
		}
	};
	// this function opens and closes the collapse on small devices
	toggleCollapse = () => {
		if (this.state.collapseOpen) {
			this.setState({
				color: "navbar-transparent",
			});
		} else {
			this.setState({
				color: "bg-white",
			});
		}
		this.setState({
			collapseOpen: !this.state.collapseOpen,
		});
	};
	// this function is to open the Search modal
	toggleModalSearch = () => {
		this.setState({
			modalSearch: !this.state.modalSearch,
		});
	};
	render() {
		return (
			<>
				<Navbar className={classNames("navbar", this.state.color)} expand="lg">
					<Container fluid>
						<div className="navbar-wrapper">
							<div
								className={classNames("navbar-toggle d-inline", {
									toggled: this.props.sidebarOpened,
								})}
							></div>
							{/* <NavbarBrand> */}
							<a className="navbar-toggler text-white" href="/home">
								Home
							</a>
							{/* </NavbarBrand> */}
						</div>
						<button
							aria-expanded={false}
							aria-label="Toggle navigation"
							className="navbar-toggler mt-1"
							data-target="#navigation"
							data-toggle="collapse"
							id="navigation"
							type="button"
							onClick={this.toggleCollapse}
						>
							<span className="navbar-toggler-bar navbar-kebab" />
							<span className="navbar-toggler-bar navbar-kebab" />
							<span className="navbar-toggler-bar navbar-kebab" />
						</button>
						<Collapse navbar isOpen={this.state.collapseOpen}>
							<Nav className="mr-auto" navbar>
								<NavItem className="text-white  d-none d-lg-block d-xl-block">
									<NavLink href="/home"> Home </NavLink>
								</NavItem>
								<NavItem className="text-white">
									<NavLink href="/about"> About</NavLink>
								</NavItem>
								<NavItem className="text-white">
									<NavLink href="/contact"> Contact </NavLink>
								</NavItem>
								<NavItem className="text-white">
									<NavLink href="/about#loans">Loans</NavLink>
								</NavItem>

								<li className="separator d-lg-none" />
							</Nav>

							<Nav className="" navbar>
								{!this.props.auth ? (
									<>
										<Button
											className="d-none d-lg-block d-xl-block"
											to="signin"
											tag={Link}
										>
											Log In
										</Button>
										<Button
											className="d-none d-lg-block d-xl-block btn-warning"
											style={{ padding: "11px 40px", margin: "5px" }}
											size="md"
											color="warning"
											href="/signup"
										>
											Sign up
										</Button>

										<NavItem className="text-white d-lg-none d-xl-none">
											<NavLink href="/signup"> Register </NavLink>
										</NavItem>

										<NavItem className="text-white d-lg-none d-xl-none">
											<NavLink href="/signin"> Login </NavLink>
										</NavItem>
									</>
								) : (
									<>
										<UncontrolledDropdown nav>
											<DropdownToggle
												caret
												color="default"
												data-toggle="dropdown"
												nav
											>
												<div className="photo">
													<img
														alt="..."
														src={require("assets/img/anime3.png")}
													/>
													<b className="caret d-none d-lg-block d-xl-block" />
												</div>
												<p className="d-lg-none">Profile</p>
											</DropdownToggle>

											<DropdownMenu className="dropdown-navbar" tag="ul" right>
												<NavLink tag="li">
													<DropdownItem
														className="nav-item"
														href="/dashboard/user-profile"
													>
														Profile
													</DropdownItem>
												</NavLink>
												<NavLink tag="li">
													<DropdownItem
														className="nav-item"
														href="/dashboard/user"
													>
														Dashboard
													</DropdownItem>
												</NavLink>
											</DropdownMenu>
										</UncontrolledDropdown>
										<Button
											className="d-none d-lg-block d-xl-block btn-warning"
											style={{ padding: "11px 40px", margin: "5px" }}
											size="md"
											color="warning"
											onClick={() => this.props.Logout()}
										>
											Log Out
										</Button>
									</>
								)}
								<li className="separator d-lg-none" />
							</Nav>
						</Collapse>
					</Container>
				</Navbar>
				<div style={{ position: "relative" }}>
					<coingecko-coin-price-marquee-widget
						coin-ids="bitcoin,ethereum,eos,ripple,litecoin"
						currency="usd"
						background-color="#17a2b8"
						locale="en"
						font-color="#ffffff"
						style={{ position: "relative" }}
					></coingecko-coin-price-marquee-widget>
				</div>
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar);
