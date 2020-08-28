import React from "react";
import Notify from "react-notification-alert";
import {
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Table,
	Row,
	Col,
	Button,
	Modal,
	ModalBody,
	Form,
	InputGroup,
	Input,
	InputGroupAddon,
	InputGroupText,
} from "reactstrap";
import fetchclient from "utils/axios";
import classnames from "classnames";
import { connect } from "react-redux";
import { Toggle } from "store/actions/auth";

class Tables extends React.Component {
	state = {
		users: [],
		modalStatus: false,
		id: "",
		status: "",
		disabled: false,
		duplicateData: [],
		disabledDelete: false,
	};
	getDAta() {
		this.props.showSpinner(true);
		fetchclient("/transaction/all").then((users) => {
			console.log(users);
			this.setState({
				users: users.data.data,
				duplicateData: users.data.data.reverse(),
			});
			this.props.showSpinner(false);
		});
	}
	componentDidMount() {
		this.getDAta();
	}
	render() {
		const searchCoin = (e) => {
			if (e.target.value.length) {
				const searchUser = this.state.users.filter((f) =>
					f.user?.name?.includes(e.target.value)
				);
				this.setState({ users: searchUser });
			} else {
				this.setState({ users: this.state.duplicateData });
			}
		};
		const selectTransaction = (e) => {
			console.log(e.target.value);
			if (e.target.value === "") {
				this.setState({ users: this.state.duplicateData });
			} else {
				let filterData = this.state.users.filter(
					(f) => f.transactionsType === e.target.value
				);
				this.setState({ users: filterData });
			}
		};
		const editTransactions = (id) => {
			this.setState({ id, modalStatus: true });
		};
		const toggle = () => {
			this.setState({ modalStatus: false });
		};
		const { users, modalStatus, status, id } = this.state;

		let options = {
			place: "tc",
			message: "",
			type: "",
			autoDismiss: 3,
			// icon: "icon-simple-remove",
		};

		const AddCoins = async (e) => {
			e.preventDefault();
			this.setState({ disabled: true });
			this.props.showSpinner(true);
			try {
				const x = await fetchclient.patch("transaction/" + id, {
					status,
				});
				console.log(x);
				this.refs.notify.notificationAlert({
					...options,
					message: "coin added sucessfully",
					type: "success",
				});
				this.getDAta();
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

		const deleteTransactions = async (id) => {
			this.props.showSpinner(true);

			this.setState({ disabledDelete: true });
			try {
				await fetchclient.delete("/transaction/" + id);
				this.getDAta();
				this.setState({ disabledDelete: false });
			} catch (error) {
				console.log(error.response);
			} finally {
				this.props.showSpinner(false);
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
									<Row>
										<Col>
											<div>
												<Input
													placeholder="Search User"
													type="search"
													onInput={searchCoin}
												/>
											</div>
										</Col>
										<Col>
											<div>
												<Input
													placeholder="Search User"
													type="select"
													onChange={selectTransaction}
												>
													<option selected={true} disabled={true}>
														Type of Transaction
													</option>
													<option value={"WITHDRAWAL"}>Withdrawal</option>
													<option value={"DEPOSIT"}>Deposit</option>
													<option value=""> All </option>
												</Input>
											</div>
										</Col>
									</Row>
								</CardHeader>
								<CardBody>
									{users.length ? (
										<Table className="tablesorter" responsive>
											<thead className="text-primary">
												<tr>
													<th>Name</th>
													<th>Type</th>
													<th>City</th>
													<th>Salary</th>
													<th className="text-center"> Modify </th>
												</tr>
											</thead>
											<tbody>
												{users.map((e) => {
													return (
														<tr key={e._id}>
															<td>{e.user.name}</td>
															<td>{e.transactionsType}</td>
															<td>
																<p
																	className={
																		e.status === "CONFIRMED"
																			? "text-success"
																			: "text-danger"
																	}
																>
																	{e.status}
																</p>
															</td>
															<td>{e.amount}</td>
															<td className="text-center">
																<Button
																	size="sm"
																	onClick={() => {
																		editTransactions(e._id);
																	}}
																>
																	Update
																</Button>
																<Button
																	size="sm"
																	onClick={() => deleteTransactions(e._id)}
																	color="danger"
																	disabled={this.state.disabledDelete}
																>
																	Delete
																</Button>
															</td>
															<td>
																<Button
																	size="sm"
																	onClick={() =>
																		this.props.history.push(
																			"/dashboard/admin/" + e.user._id
																		)
																	}
																>
																	View
																</Button>
															</td>
														</tr>
													);
												})}
											</tbody>
										</Table>
									) : (
										<h2> No User with a transaction found </h2>
									)}
								</CardBody>
							</Card>
						</Col>
					</Row>

					<Modal isOpen={modalStatus} toggle={toggle}>
						<ModalBody>
							<Card>
								<CardBody>
									<Form className="form" onSubmit={AddCoins}>
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
												this.state.status.length && !this.state.disabled
													? false
													: true
											}
										>
											Update
										</Button>
									</Form>
								</CardBody>
							</Card>
						</ModalBody>
					</Modal>
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
