import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
// import avatar from "../assets/img/";
// reactstrap components

import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardTitle,
	CardText,
	FormGroup,
	Form,
	Input,
	Row,
	Col,
	Table,
} from "reactstrap";
import fetchclient from "utils/axios";
import { connect } from "react-redux";
import { Logout } from "store/actions/auth";
import { Toggle } from "store/actions/auth";

const UserProfile = (props) => {
	const [user, userData] = useState({
		name: "",
		phone: "",
		about: "",
		email: "",
		country: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [disabled, setDisabled] = useState(false);

	const submit = async () => {
		setDisabled(true);
		try {
			props.showSpinner(true);
			const response = await fetchclient.patch(
				"/user/" + props.match.params.user,
				{
					email: user.email,
					name: user.name,
					about: user.about,
					phone: user.phone,
					country: user.country,
				}
			);
			console.log(response);
			// props.history.push("/dashboard/user");
		} catch (error) {
			console.log(error.response);
		} finally {
			props.showSpinner(false);
		}

		setDisabled(false);
	};

	const deleteAccount = async () => {
		let confirm = window.confirm(
			"are you sure you want to delete your account"
		);
		if (confirm) {
			try {
				props.showSpinner(true);
				const response = await fetchclient.delete(
					"/user/" + props.match.params.user
				);
				console.log(response);
				props.Logout();
				props.history.push("/home");
			} catch (error) {
				console.log(error.response);
				props.showSpinner(false);
			}
		}
	};

	// const filteResponse = (data) => {
	// 	data.f
	// }

	useEffect(() => {
		props.showSpinner(true);
		async function getUser(id) {
			setLoading(true);
			setError(false);

			try {
				setError(true);
				const response = await fetchclient("/user/" + props.match.params.user);
				userData(response.data.data);
				console.log(response);
				// filteResponse(response.data.data)
			} catch (error) {
				console.log(error.response);
				setError(true);
			} finally {
				setLoading(false);
			}
			props.showSpinner(false);
		}
		const token = localStorage.getItem("auth-token");
		console.log(token);
		const userid = jwt.decode(token);
		getUser(userid.id);
		// userid.id;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let y =
			user?.name?.length &&
			user?.email?.length &&
			user?.phone?.length &&
			user?.country?.length
				? false
				: true;
		setDisabled(y);
	}, [user, userData]);

	return (
		<>
			<div className="content">
				<Row>
					<Col lg="3">
						<Card className="card-chart">
							<CardHeader>
								<h5 className="card-category"> Confirmed Total Balance</h5>
								<CardTitle tag="h3">
									<i className="tim-icons icon-bell-55 text-info" />{" "}
									{user.confirmed + user.bonus
										? (user.confirmed + user.bonus).toString().slice(0, 7)
										: "0.000"}
								</CardTitle>
							</CardHeader>
						</Card>
					</Col>
					<Col lg="3">
						<Card className="card-chart">
							<CardHeader>
								<h5 className="card-category">Invested Amount</h5>
								<CardTitle tag="h3">
									<i className="tim-icons icon-coins text-primary" />{" "}
									{user.deposit ? user.deposit.toString().slice(0, 7) : "0.000"}
								</CardTitle>
							</CardHeader>
						</Card>
					</Col>
					<Col lg="3">
						<Card className="card-chart">
							<CardHeader>
								<h5 className="card-category">Confirmed Total Withdraw</h5>
								<CardTitle tag="h3">
									<i className="tim-icons icon-bank text-success" />
									{user.withdraw
										? user.withdraw.toString().slice(0, 7)
										: "0.000"}
								</CardTitle>
							</CardHeader>
						</Card>
					</Col>
					<Col lg="3">
						<Card className="card-chart">
							<CardHeader>
								<h5 className="card-category">Bonus</h5>
								<CardTitle tag="h3">
									<i className="tim-icons icon-bank text-success" />
									{user.bonus > 0 ? user.bonus.toString().slice(0, 7) : "0.000"}
								</CardTitle>
							</CardHeader>
						</Card>
					</Col>
				</Row>

				<div>
					{loading ? (
						"loading....."
					) : !error ? (
						"error occured"
					) : (
						<Row>
							<Col md="8">
								<Card>
									<CardHeader>
										<h5 className="title">Edit Profile</h5>
									</CardHeader>
									<CardBody>
										<Form>
											<Row>
												<Col className="pr-md-1">
													<FormGroup>
														<label>Full Name</label>
														<Input
															placeholder="Username"
															type="text"
															defaultValue={user.name ? user.name : ""}
															onInput={(e) =>
																userData({ ...user, name: e.target.value })
															}
														/>
													</FormGroup>
												</Col>

												<Col className="pl-md-1">
													<FormGroup>
														<label htmlFor="exampleInputEmail1">Username</label>
														<Input
															placeholder="username"
															type="phone"
															value={user.username}
															onInput={(e) =>
																userData({ ...user, username: e.target.value })
															}
														/>
													</FormGroup>
												</Col>
											</Row>
											<Row>
												<Col className="pr-md-1">
													<FormGroup>
														<label>Phone</label>
														<Input
															placeholder="Phone"
															type="text"
															defaultValue={user.phone ? user.phone : ""}
															onInput={(e) =>
																userData({ ...user, phone: e.target.value })
															}
														/>
													</FormGroup>
												</Col>

												<Col className="pl-md-1">
													<FormGroup>
														<label htmlFor="exampleInputEmail1">
															Email address
														</label>
														<Input
															placeholder="mike@email.com"
															type="email"
															value={user.email}
															onInput={(e) =>
																userData({ ...user, email: e.target.value })
															}
														/>
													</FormGroup>
												</Col>
											</Row>
											<Row>
												<Col className="pr-md-1">
													<FormGroup>
														<label>Country</label>
														<Input
															placeholder="Germany"
															type="email"
															value={user.country}
															onInput={(e) =>
																userData({ ...user, country: e.target.value })
															}
														/>
													</FormGroup>
												</Col>
												<Col className="pl-md-1">
													<FormGroup>
														<label>About Me</label>
														<Input
															cols="80"
															placeholder="Here can be your description"
															rows="4"
															type="textarea"
															onInput={(e) =>
																userData({ ...user, about: e.target.value })
															}
														/>
													</FormGroup>
												</Col>
											</Row>
										</Form>
									</CardBody>
									<CardFooter>
										<Button
											className="btn-fill"
											color="primary"
											type="submit"
											onClick={submit}
											disabled={disabled}
										>
											Save
										</Button>
									</CardFooter>
								</Card>
							</Col>
							<Col md="4">
								<Card className="card-user">
									<CardBody>
										<CardText style={{ textAlign: "center" }} />
										<div className="author">
											<div className="block block-one" />
											<div className="block block-two" />
											<div className="block block-three" />
											<div className="block block-four" />
											<img
												alt="..."
												className="avatar"
												src={require("assets/img/anime3.png")}
											/>
											<h5 className="title">{user.name}</h5>
											<p className="description">{user.email}</p>
										</div>
										<div className="card-description text-center">
											{user.about}
										</div>
										<div
											style={{ textAlign: "center" }}
											onClick={deleteAccount}
										>
											<Button color="danger">Delete Account</Button>
										</div>
									</CardBody>
								</Card>
							</Col>
						</Row>
					)}

					<section>
						<Row>
							<Col>
								<Card>
									<CardBody className="text-white text-center">
										All Deposit transactions by {user.name}
									</CardBody>
									<Table className="tablesorter">
										<thead className="text-primary">
											<tr>
												<th>Date</th>
												<th>Status</th>
												<th>amount</th>
											</tr>
										</thead>
										<tbody>
											{user.transactions
												? user?.transactions?.map((e, i) => {
														return (
															<tr key={i + "table"}>
																{e.transactionsType === "DEPOSIT" ? (
																	<>
																		<td>{e.createdAt.slice(0, 10)}</td>
																		<td>{e.status}</td>
																		<td>{e.amount}</td>
																	</>
																) : (
																	""
																)}
															</tr>
														);
												  })
												: null}
										</tbody>
									</Table>
								</Card>
							</Col>
							<Col>
								<Card>
									<CardBody className="text-white text-center">
										All Withdraw transactions by {user.name}
									</CardBody>
									<Table className="tablesorter">
										<thead className="text-primary">
											<tr>
												<th>Date</th>
												<th>Status</th>
												<th>amount</th>
											</tr>
										</thead>
										<tbody>
											{user.transactions
												? user?.transactions?.map((e, i) => {
														return (
															<tr key={i + "table"}>
																{e.transactionsType === "WITHDRAWAL" ? (
																	<>
																		<td>{e.createdAt.slice(0, 10)}</td>
																		<td>{e.status}</td>
																		<td>{e.amount}</td>
																	</>
																) : (
																	""
																)}
															</tr>
														);
												  })
												: null}
										</tbody>
									</Table>
								</Card>
							</Col>
						</Row>
					</section>
				</div>
			</div>
		</>
	);
};

const mapDispatchToProps = (dispatch) => ({
	Logout() {
		dispatch(Logout());
	},
	showSpinner(payload) {
		dispatch(Toggle(payload));
	},
});

export default connect(null, mapDispatchToProps)(UserProfile);
