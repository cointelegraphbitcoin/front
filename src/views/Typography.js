/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Table,
	Button,
	Row,
	Col,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Modal,
	ModalBody,
} from "reactstrap";
import classnames from "classnames";
import Notify from "react-notification-alert";
import fetchclient from "utils/axios";
import { connect } from "react-redux";
import { Toggle } from "store/actions/auth";

class Tables extends React.Component {
	state = {
		users: [],
		loading: false,
		modalStatus: false,
		id: "",
		status: "",
		amount: "",
		disabled: false,
		duplicateUSers: [],
	};
	componentDidMount() {
		this.props.showSpinner(true);
		this.setState({ loading: true });
		fetchclient("/user/all").then((users) => {
			console.log(users);
			this.setState({
				users: users.data.data.reverse(),
				duplicateUSers: users.data.data.reverse(),
			});
			this.props.showSpinner(false);
			this.setState({ loading: false });
		});
	}
	render() {
		const {
			users,
			loading,
			modalStatus,
			id,
			amount,
			status,
			duplicateUSers,
		} = this.state;

		const searchTerm = (e) => {
			if (e.target.value !== "") {
				let arr = users.filter((f) => f.username.includes(e.target.value));
				this.setState({
					users: arr,
				});
			} else {
				this.setState({ users: duplicateUSers });
			}
		};
		let options = {
			place: "tc",
			message: "",
			type: "",
			autoDismiss: 3,
			// icon: "icon-simple-remove",
		};
		const toggle = () => {
			this.setState({
				modalStatus: false,
			});
		};
		const AddCoins = async (e) => {
			this.props.showSpinner(true);
			e.preventDefault();
			this.setState({ disabled: true });
			try {
				const x = await fetchclient.post("transaction/" + id, {
					amount,
					status,
					transactionsType: "DEPOSIT",
				});
				console.log(x);
				this.refs.notify.notificationAlert({
					...options,
					message: "coin added sucessfully",
					type: "success",
				});
			} catch (error) {
				console.log(error.response);
				this.refs.notify.notificationAlert({
					...options,
					message: error.response.data?.error?.message
						? error.response.data.error.message
						: "failed to add coin",
					type: "danger",
				});
			} finally {
				this.props.showSpinner(false);
				this.setState({ disabled: false });
			}
		};
		const deleteUser = async (id) => {
			try {
				this.props.showSpinner(true);

				let confirm = window.confirm("do you wan to delete this user");
				if (confirm) {
					this.setState({ loading: true });
					await fetchclient.delete("/user/" + id);
					this.refs.notify.notificationAlert({
						...options,
						message: "deleted sucessfully",
						type: "success",
					});
					this.setState({
						users: this.state.users.filter((e) => {
							return e._id !== id;
						}),
					});
				}
			} catch (error) {
				console.log(error.response, error);
				this.refs.notify.notificationAlert({
					...options,
					message: "failed to delete user",
					type: "danger",
				});
			} finally {
				this.props.showSpinner(true);
				this.setState({ loading: false });
			}
		};
		return (
			<>
				<div className="content">
					<Notify ref="notify" />
					<Row>
						<Col md="12">
							<Card>
								<CardHeader>
									<CardTitle tag="h4">All Transactions</CardTitle>
									<Input
										type="search"
										placeholder="Name of User "
										style={{ maxWidth: "300px" }}
										onInput={searchTerm}
									/>
								</CardHeader>
								<CardBody>
									{loading ? (
										"loading....."
									) : (
										<Table className="tablesorter" responsive>
											<thead className="text-primary">
												<tr>
													<th>UserName</th>
													<th>email</th>
													<th>Country</th>
													<th className="text-center">Add Coins</th>
													<th> Actions</th>
													<th> Delete</th>
												</tr>
											</thead>
											<tbody>
												{users.map((e) => {
													return (
														<tr key={e._id}>
															<td>{e.username}</td>
															<td>{e.email}</td>
															<td>{e.country}</td>
															<td className="text-center">
																<Button
																	color="success"
																	size="sm"
																	onClick={() => {
																		this.setState({ id: e._id });
																		this.setState({ modalStatus: true });
																	}}
																>
																	Add Coins
																</Button>
															</td>
															<td>
																<Button
																	size="sm"
																	onClick={() => {
																		this.props.history.push(
																			"/dashboard/admin/" + e._id
																		);
																	}}
																>
																	{""}
																	View{" "}
																</Button>
															</td>
															<td>
																<Button
																	color="danger"
																	size="sm"
																	onClick={() => deleteUser(e._id)}
																>
																	Delete
																</Button>
															</td>
														</tr>
													);
												})}
											</tbody>
										</Table>
									)}
								</CardBody>
							</Card>
						</Col>
					</Row>

					{modalStatus ? (
						<Modal isOpen={modalStatus} toggle={toggle}>
							<ModalBody>
								<Card>
									<CardBody>
										<Form className="form" onSubmit={AddCoins}>
											<InputGroup
												className={classnames({
													"input-group-focus": this.state.amountFocus,
												})}
											>
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="tim-icons icon-email-85" />
													</InputGroupText>
												</InputGroupAddon>
												<Input
													placeholder="Amount"
													type="number"
													step="0.000000000000001"
													onFocus={(e) => this.setState({ amountFocus: true })}
													onBlur={(e) => this.setState({ amountFocus: false })}
													onInput={(e) =>
														this.setState({ amount: e.target.value })
													}
												/>
											</InputGroup>
											<InputGroup
												className={classnames({
													"input-group-focus": this.state.statusFocus,
												})}
											>
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="tim-icons icon-lock-circle" />
													</InputGroupText>
												</InputGroupAddon>
												<Input
													placeholder="Status"
													type="select"
													onFocus={(e) => this.setState({ statusFocus: true })}
													onBlur={(e) => this.setState({ statusFocus: false })}
													onChange={(e) =>
														this.setState({ status: e.target.value })
													}
												>
													<option selected={true} disabled={true}>
														select
													</option>
													<option value={"PENDING"}>Pending</option>
													<option value={"CONFIRMED"}>Confirmed</option>
													<option value={"FAILED"}>Failed</option>
												</Input>
											</InputGroup>
											<Button
												className="btn-round"
												color="primary"
												disabled={
													this.state.amount.length &&
													this.state.status.length &&
													!this.state.disabled
														? false
														: true
												}
											>
												Add Coins
											</Button>
										</Form>
									</CardBody>
								</Card>
							</ModalBody>
						</Modal>
					) : (
						""
					)}
				</div>
			</>
		);
	}
}
const mapDispatchToProps = (dispatch) => ({
	showSpinner(payload) {
		dispatch(Toggle(payload));
	},
});

export default connect(null, mapDispatchToProps)(Tables);
