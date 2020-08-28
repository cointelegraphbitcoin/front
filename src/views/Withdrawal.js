import React from "react";
import NotificationAlert from "react-notification-alert";
import classnames from "classnames";
// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Row,
	Col,
	InputGroup,
	Form,
	Input,
} from "reactstrap";
import fetchclient from "utils/axios";
import { connect } from "react-redux";
import { Toggle } from "store/actions/auth";

class Notifications extends React.Component {
	notify = (color, message) => {
		var options = {};
		options = {
			place: "tr",
			message: (
				<div>
					{color === "success" ? (
						<div>
							A confirmation mail will be sent to you in no time -
							NB:Withdrawals might take some time to be completed
						</div>
					) : (
						<div>{message}</div>
					)}
				</div>
			),
			type: color,
			icon: "tim-icons icon-bell-55",
			autoDismiss: 7,
		};
		this.refs.notificationAlert.notificationAlert(options);
	};
	componentDidMount() {
		this.props.showSpinner(true);
		fetchclient("user").then((user) => {
			console.log(user);
			this.setState({ balance: user.data.data.balance.confirmed });
			this.props.showSpinner(false);
		});
	}
	state = {
		amount: 0,
		bonus: 0,
		wallet: "",
		balance: undefined,
	};
	render() {
		const submit = async (e) => {
			e.preventDefault();
			try {
				this.props.showSpinner(true);
				const { wallet, amount } = this.state;
				const data = {
					wallet,
					amount,
				};
				const response = await fetchclient.post("transaction", {
					...data,
				});
				console.log(response);
				this.notify("success");
			} catch (error) {
				console.log(error.response);
				this.props.showSpinner(false);
				if (error?.response?.data?.error) {
					this.notify("danger", error?.response?.data?.error);
				} else {
					this.notify("danger", "error ocurred please try again later");
				}
			}
		};
		return (
			<>
				<div className="content">
					<div className="react-notification-alert-container">
						<NotificationAlert ref="notificationAlert" />
					</div>

					<Row>
						<Col md="8" xs="10" sm="11" className="mx-auto">
							<Card>
								<CardHeader>
									<CardTitle tag="h4">Request Withdrawal</CardTitle>
								</CardHeader>
								<CardBody>
									<h1>
										Balance:
										{this.state.balance
											? (this.state.balance + this.state.bonus)
													.toString()
													.slice(0, 7) + "btc"
											: "$0.000"}
									</h1>
									<Form className="form" onSubmit={submit}>
										<InputGroup
											className={classnames({
												"input-group-focus": this.state.passwordFocus,
											})}
										>
											<Input
												placeholder="Amount"
												type="number"
												onFocus={(e) => this.setState({ passwordFocus: true })}
												onBlur={(e) => this.setState({ passwordFocus: false })}
												onInput={(e) =>
													this.setState({ amount: e.target.value })
												}
												step="0.0000001"
											/>
										</InputGroup>
										<InputGroup
											className={classnames({
												"input-group-focus": this.state.passwordFocus,
											})}
										>
											<Input
												placeholder="Wallet"
												type="text"
												onFocus={(e) => this.setState({ passwordFocus: true })}
												onBlur={(e) => this.setState({ passwordFocus: false })}
												onInput={(e) =>
													this.setState({ wallet: e.target.value })
												}
											/>
										</InputGroup>

										<Button
											disabled={
												this.state.amount.length && this.state.wallet.length
													? false
													: true
											}
										>
											WithDraw
										</Button>
									</Form>
								</CardBody>
							</Card>
						</Col>
					</Row>
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

export default connect(null, mapDispatchToProps)(Notifications);
