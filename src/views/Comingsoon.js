import React, { useState, useEffect } from "react";

import { Row, Container, Col, Input, Button, Alert } from "reactstrap";

export default function Comingsoon(props) {
	const [visible, setVisible] = useState(false);
	const [disable, setDisable] = useState(false);

	const Submit = (e) => {
		e.preventDefault();
		setVisible(true);
		setDisable(true);

		setTimeout(() => {
			setVisible(false);
			setDisable(false);
		}, 2000);
	};
	useEffect(() => {
		props.history.push("/home");
	});

	return (
		<div className="__banner">
			<Alert
				color="primary"
				isOpen={visible}
				toggle={setVisible}
				className="position-fixed __alert pr-5"
			>
				<p className="pl-3">thanks for joining our wait list!</p>
			</Alert>

			<Container>
				<Row xs="1" sm="1" className="align-items-center __h-screen">
					<Col md="7" xs="12">
						<h4 className="text-white"> Coming Soon !!! </h4>
						<h1 className="title text-white">
							BEST INVESTMENTS PLAN FOR WORLDWIDE
						</h1>
						<h3 className="text-white">
							We develop effective plans to move your customers behaviour.
							customer can be alwayes his profit.
						</h3>
						<div>
							<form onSubmit={Submit}>
								<Row className="align-items-center" xs="1" sm="1" md="1">
									<Col>
										<Input
											type="email"
											name="email"
											id="commingsoonmail"
											placeholder="Enter email"
											style={{ minWidth: "250px" }}
										/>
									</Col>
									<Col>
										<Button color="primary" disabled={disable}>
											Send me a mail
										</Button>
									</Col>
								</Row>
							</form>
						</div>
					</Col>
					<Col></Col>
				</Row>
			</Container>
		</div>
	);
}
