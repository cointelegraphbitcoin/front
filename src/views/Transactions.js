import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
	Col,
	Row,
	Card,
	CardBody,
	CardTitle,
	CardHeader,
	Table,
} from "reactstrap";
import { Toggle } from "store/actions/auth";
import fetchclient from "utils/axios";

function Transactions(props) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [data, setData] = useState([]);

	const getData = async () => {
		props.showSpinner(true);
		setLoading(true);
		setError(false);
		console.log("getting Data");
		try {
			let data = await fetchclient("/transaction");
			console.log(data);
			setData(data.data.data);
		} catch (error) {
			setError(true);
			console.log(error.response);
		} finally {
			setLoading(false);
			props.showSpinner(false);
		}
	};

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const TableLoop = () => {
		return data.map((e) => {
			return (
				<tr key={e._id}>
					<td>{e.createdAt.slice(0, 10)}</td>
					<td>{e.transactionsType}</td>
					<td>{e.status}</td>
					<td className="text-center">{e.amount}btc</td>
				</tr>
			);
		});
	};
	return (
		<>
			<div className="content">
				<h1 className="title text-white"> Transactions </h1>
				<Row>
					<Col md="12">
						<Card>
							<CardHeader>
								<CardTitle tag="h4">Simple Table</CardTitle>
							</CardHeader>
							<CardBody>
								{loading ? (
									"loading....."
								) : error ? (
									"error occured...."
								) : data.length ? (
									<Table className="tablesorter" responsive>
										<thead className="text-primary">
											<tr>
												<th>DATE</th>
												<th>TYPE</th>
												<th>STATUS</th>
												<th className="text-center">Amount</th>
											</tr>
										</thead>
										<tbody>{TableLoop()}</tbody>
									</Table>
								) : (
									<>
										<h3> You Have no Confirmed Transaction</h3>
										<h5>
											NB: if you made a transaction You have to wait at least
											2hrs for transaction to be Confirmed
										</h5>
									</>
								)}
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
}

// const data = [
// 	{
// 		data,
// 	},
// ];

const mapDispatchToProps = (dispatch) => ({
	showSpinner(payload) {
		dispatch(Toggle(payload));
	},
});

export default connect(null, mapDispatchToProps)(Transactions);
