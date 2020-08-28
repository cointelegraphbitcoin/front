import React from "react";
import NavBar from "components/Navbars/RTLNavbar";
import fetchclient from "../utils/axios";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { Login, Toggle } from "../store/actions/auth";
import { connect } from "react-redux";
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
import Notify from "react-notification-alert";
import countries from "../variables/coutries";

class Signup extends React.Component {
	state = {
		email: "",
		password: "",
		fullName: "",
		middleName: "",
		phone: "",
		country: "",
		error: {},
		loading: false,
	};

	onDismiss() {
		this.setState({ visible: false });
	}

	render() {
		let options = {
			place: "tc",
			message: "",
			type: "",
			autoDismiss: 300,
			// icon: "icon-simple-remove",
		};

		const Submit = async (e) => {
			this.props.showSpinner(false);
			this.setState({ loading: true });
			e.preventDefault();
			const {
				email,
				fullName,
				password,
				phone,
				middleName,
				country,
			} = this.state;
			console.log(email, fullName, password, "submited");
			const data = {
				name: fullName,
				email,
				password,
				phone,
				middleName,
				country,
			};
			try {
				const response = await fetchclient.post("signup", data);
				localStorage.setItem("auth-token", response.data.data.token);
				this.refs.notify.notificationAlert({
					...options,
					message: "signed up successfully",
					type: "success",
				});
				this.props.Login();
				this.props.history.push("/dashboard/user");
				this.props.showSpinner(false);
			} catch (error) {
				console.log(error.response);
				this.refs.notify.notificationAlert({
					...options,
					message: error.response.data.error,
					type: "danger",
				});
				this.props.showSpinner(false);
			} finally {
				this.setState({ loading: false });
			}
		};
		const validate = () => {
			const { email } = this.state;
			var re = /\S+@\S+\.\S+/;
			if (re.test(email)) {
				return true;
			}

			return false;
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
					<Row className=" justify-content-center align-items-center __h-screen pt-5">
						<Col lg="6" className="d-none d-lg-block d-xl-block">
							<h3 className="display-3 text-white">
								Join the King of crypto Investments
								<span className="text-white"> over 90% success recorded</span>
							</h3>
							<p className="text-white mb-3">
								The Design System comes with four pre-built pages to help you
								get started faster. You can change the text and images and.
							</p>
							<div className="btn-wrapper">
								<Button color="primary" to="signin" tag={Link}>
									Login Here
								</Button>
							</div>
						</Col>
						<Col className="" lg="6">
							<Card className="card-register">
								<CardHeader>
									<CardTitle tag="h4">Register</CardTitle>
								</CardHeader>
								<CardBody>
									<Form className="form">
										<InputGroup
											className={classnames({
												"input-group-focus": this.state.fullNameFocus,
											})}
										>
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="tim-icons icon-single-02" />
												</InputGroupText>
											</InputGroupAddon>
											<Input
												placeholder="Full Name"
												required={true}
												type="text"
												onInput={(e) =>
													this.setState({ fullName: e.target.value })
												}
												onFocus={() => this.setState({ fullNameFocus: true })}
												onBlur={() => this.setState({ fullNameFocus: false })}
											/>
										</InputGroup>
										<InputGroup
											className={classnames({
												"input-group-focus": this.state.middleNameFocus,
											})}
										>
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="tim-icons icon-single-02" />
												</InputGroupText>
											</InputGroupAddon>
											<Input
												placeholder="Middle Name"
												required={true}
												type="text"
												onInput={(e) =>
													this.setState({ middleName: e.target.value })
												}
												onFocus={() => this.setState({ middleNameFocus: true })}
												onBlur={() => this.setState({ middleNameFocus: false })}
											/>
										</InputGroup>
										<InputGroup
											className={classnames({
												"input-group-focus": this.state.phoneFocus,
											})}
										>
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="tim-icons icon-badge" />
												</InputGroupText>
											</InputGroupAddon>
											<Input
												placeholder="Phone"
												required={true}
												type="tel"
												onInput={(e) =>
													this.setState({ phone: e.target.value })
												}
												onFocus={() => this.setState({ phoneFocus: true })}
												onBlur={() => this.setState({ phoneFocus: false })}
											/>
										</InputGroup>
										<InputGroup
											className={classnames({
												"input-group-focus": this.state.emailFocus,
												"has-danger": !validate() && this.state.email.length,
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
												required={true}
												onInput={(e) =>
													this.setState({ email: e.target.value })
												}
												onFocus={() => this.setState({ emailFocus: true })}
												onBlur={() => this.setState({ emailFocus: false })}
											/>
										</InputGroup>

										<InputGroup
											className={classnames({
												"input-group-focus": this.state.countryFocus,
											})}
										>
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="tim-icons icon-compass-05" />
												</InputGroupText>
											</InputGroupAddon>

											<Input
												type="select"
												name="select"
												id="exampleSelect"
												onFocus={() => this.setState({ countryFocus: true })}
												onBlur={() => this.setState({ countryFocus: false })}
												value={
													this.state.country ? this.state.country : "Country"
												}
												onChange={(e) =>
													this.setState({ country: e.target.value })
												}
											>
												<option selected={true} disabled={true}>
													Country
												</option>
												{countries.map((e, i) => {
													return (
														<option key={e.country + i} value={e.country}>
															{e.country}
														</option>
													);
												})}
											</Input>
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
												onInput={(e) =>
													this.setState({ password: e.target.value })
												}
												onFocus={() => this.setState({ passwordFocus: true })}
												onBlur={() => this.setState({ passwordFocus: false })}
											/>
										</InputGroup>
									</Form>
								</CardBody>
								<CardFooter>
									<Button
										className="btn-round"
										onClick={Submit}
										color="primary"
										type="submit"
										disabled={
											this.state.email.length &&
											this.state.fullName.length &&
											this.state.password.length &&
											this.state.phone.length &&
											this.state.middleName.length &&
											this.state.country.length &&
											!this.state.loading &&
											validate()
												? false
												: true
										}
									>
										Get Started
									</Button>
								</CardFooter>
							</Card>
							<Button
								color="primary"
								to="signin"
								tag={Link}
								className="d-lg-none d-xl-none btn-round"
							>
								Sign in Here
							</Button>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	state: state,
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
