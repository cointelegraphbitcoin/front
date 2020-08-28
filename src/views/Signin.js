import React from "react";
import NavBar from "components/Navbars/RTLNavbar";
import { connect } from "react-redux";
import classnames from "classnames";
import { Login, Toggle } from "../store/actions/auth";
import { Link } from "react-router-dom";
// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardTitle,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Row,
	Col,
} from "reactstrap";
import fetchclient from "../utils/axios";
import Notify from "react-notification-alert";

class Signup extends React.Component {
	state = {
		email: "",
		password: "",
		disabled: false,
	};
	render() {
		let options = {
			place: "tc",
			message: "",
			type: "",
			autoDismiss: 3,
			// icon: "icon-simple-remove",
		};

		const Submit = async (e) => {
			e.preventDefault();
			this.props.showSpinner(true);
			this.setState({ disabled: true });
			const { email, password } = this.state;
			const data = {
				email,
				password,
			};
			try {
				let response = await fetchclient.post("/signin", data);
				this.refs.notify.notificationAlert({
					...options,
					message: "welcome back",
					type: "success",
				});
				console.log(response);
				debugger;
				localStorage.setItem("auth-token", response.data.data);
				console.log(response);
				this.props.Login();
				this.props.showSpinner(false);
				this.props.history.push("/dashboard/user");
			} catch (error) {
				this.props.showSpinner(false);
				console.log(error.response);
				this.refs.notify.notificationAlert({
					...options,
					message: "incorrect user name and Password",
					type: "danger",
				});
			}

			this.setState({ disabled: false });
		};
		return (
			<div className="section section-signup">
				<Notify ref="notify" />
				<div
					className="position-fixed bg-default"
					style={{ width: "100%", zIndex: 4 }}
				>
					<NavBar />
				</div>
				<Container>
					<Row className=" justify-content-center align-items-center __h-screen">
						<Col lg="6" className="d-none d-lg-block d-xl-block">
							<h3 className="display-3 text-white">
								Welcome back to the King of crypto Investments
								<span className="text-white"> over 90% success recorded</span>
							</h3>
							<div className="btn-wrapper">
								<Button color="primary" to="signup" tag={Link}>
									Register Here
								</Button>
							</div>
						</Col>
						<Col className="" lg="6">
							<Card className="card-register">
								<CardHeader>
									<CardTitle tag="h4">Log In</CardTitle>
								</CardHeader>
								<CardBody>
									<Form className="form" onSubmit={Submit}>
										<InputGroup
											className={classnames({
												"input-group-focus": this.state.emailFocus,
											})}
										>
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="tim-icons icon-email-85" />
												</InputGroupText>
											</InputGroupAddon>
											<Input
												placeholder="Email"
												type="text"
												onFocus={(e) => this.setState({ emailFocus: true })}
												onBlur={(e) => this.setState({ emailFocus: false })}
												onInput={(e) =>
													this.setState({ email: e.target.value })
												}
											/>
										</InputGroup>
										<InputGroup
											className={classnames({
												"input-group-focus": this.state.passwordFocus,
											})}
										>
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="tim-icons icon-lock-circle" />
												</InputGroupText>
											</InputGroupAddon>
											<Input
												placeholder="Password"
												type="password"
												onFocus={(e) => this.setState({ passwordFocus: true })}
												onBlur={(e) => this.setState({ passwordFocus: false })}
												onInput={(e) =>
													this.setState({ password: e.target.value })
												}
											/>
										</InputGroup>
										<Button
											className="btn-round"
											color="primary"
											disabled={
												this.state.email.length &&
												this.state.password.length &&
												!this.state.disabled
													? false
													: true
											}
										>
											Log In
										</Button>
									</Form>
								</CardBody>
								<CardFooter></CardFooter>
							</Card>
							<Button
								color="primary"
								to="signup"
								tag={Link}
								className="d-lg-none d-xl-none btn-round"
							>
								Register Here
							</Button>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	authenticated: state,
});

const mapDispatchToProps = (dispatch) => ({
	Login() {
		dispatch(Login());
	},
	showSpinner(payload) {
		dispatch(Toggle(payload));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
