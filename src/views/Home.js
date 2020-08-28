import React from "react";
import NavBar from "components/Navbars/RTLNavbar";
import { connect } from "react-redux";

import {
	Container,
	Col,
	Row,
	Button,
	Card,
	CardBody,
	CardFooter,
	ListGroupItem,
	ListGroup,
} from "reactstrap";
import WorldStats from "components/worldStats";
import img2 from "../assets/img/image2.png";
import img4 from "../assets/img/vector-01.svg";
import { Login, Logout } from "store/actions/auth";

function Home(props) {
	// const viewDashboard = () => {
	// 	props.Login();
	// };
	return (
		<>
			<div
				className="position-fixed bg-default"
				style={{ width: "100%", zIndex: 4 }}
			>
				<NavBar />
			</div>

			<Container className="pt-5">
				<Row className="align-items-center __h-screen">
					<Col lg="5">
						<img src={img2} alt="btc" />
					</Col>
					<Col>
						<h1 className="title text-white"> WE TRADE CRYPTO CURRENCIES. </h1>
						<h3 className="text-white">
							We recieve result combining marketing, a creative and industry
							experience...
						</h3>
						<Button href="/dashboard/investment"> Invest </Button>{" "}
						{!props.auth ? (
							<Button color="warning" href="/dashboard/user">
								Login
							</Button>
						) : (
							""
						)}
					</Col>
				</Row>
				<section>
					<div className="my-5 row">
						<div className="col-md-4 ">
							<div className="info bg-default p-3">
								<h4 className="info-title text-white">
									<i
										className="tim-icons icon-tap-02 text-primary title"
										style={{ fontSize: "35px" }}
									></i>
									<span className="ml-2 ">Register Your Account</span>
								</h4>
							</div>
						</div>
						<div className="col-md-4">
							<div className="info  bg-info p-3">
								<h4 className="info-title text-white">
									<i
										className="tim-icons icon-chart-bar-32 text-danger title"
										style={{ fontSize: "30px" }}
									></i>
									<span className="ml-2">Deposit Funds & Watch It Grow</span>
								</h4>
							</div>
						</div>
						<div className="col-md-4">
							<div className="info  bg-default p-3 ">
								<h4 className="info-title text-white">
									<i
										className="tim-icons icon-coins text-primary title"
										style={{ fontSize: "35px" }}
									></i>
									<span className="ml-2"> Withdraw Your Profits</span>
								</h4>
							</div>
						</div>
					</div>
				</section>
				{/** why choose Us Div **/}
				<section className="pt-5">
					<h1 className="title text-center mt-5 text-white"> Why Choose Us</h1>
					<h4
						className="text-center mx-auto text-white"
						style={{ maxWidth: "700px" }}
					>
						trading platform is a group of financial and cryptocurrency experts
						that invest in mining and cryptocurrency trading . We carefully
						examine the volatility of bitcoin and other cryptocurrencies, invest
						and make good profit from our investments.
					</h4>

					<section>
						<div className="my-5 row">
							<div className="col-md-3 ">
								<div className="info bg-default p-3">
									<h4 className="info-title text-white">SAFE AND SECURE</h4>
									<hr className="line-primary" />
									<p className="text-white">
										Our website and bots communicates with the server through a
										highly secured channel. The server as well runs the latest
										industry standard anti virus for maximum security
									</p>
								</div>
							</div>
							<div className="col-md-3">
								<div className="info  bg-info p-3">
									<h4 className="info-title text-white">MAXIMISED RETURNS</h4>
									<hr className="line-warning" />
									<p className="text-white">
										Our bots have been designed by professionals in the industry
										to give you valuable returns on your investment. You are
										assured of getting value for your money
									</p>
								</div>
							</div>
							<div className="col-md-3">
								<div className="info  bg-info p-3 ">
									<h4 className="info-title text-white">LOW RISK</h4>
									<hr className="line-danger" />
									<p className="text-white">
										Investments are leveraged into various networks, with the
										aid of professional alliance, risk of failure is brought to
										the barest minimum. You will invest with peace of mind
									</p>
								</div>
							</div>
							<div className="col-md-3">
								<div className="info  bg-default p-3">
									<h4 className="info-title text-white">WHATSAPP GROUP</h4>
									<hr className="line-danger" />
									<p className="text-white">
										Join our whatsapp Group for Effective and Easy communication
										on Trades
									</p>
									<Button color="primary" to="/login">
										Join Now
									</Button>
								</div>
							</div>
						</div>
					</section>
				</section>
				<Container>
					<Row>
						<Col md="4" className="section-coins">
							<hr className="line-info" />
							<h1>
								Choose the coin
								<span className="text-info"> that fits your needs</span>
							</h1>
						</Col>
					</Row>
					<Row>
						<Col md="4">
							<Card className="card-coin card-plain">
								<CardBody>
									<Row>
										<Col className="text-center" md="12">
											<h4 className="text-uppercase">BRONZE COIN</h4>
											<span>Plan</span>
											<hr className="line-primary" />
										</Col>
									</Row>
									<Row>
										<ListGroup>
											<ListGroupItem>0.10btc - 5btc</ListGroupItem>
											<ListGroupItem>+15% profit </ListGroupItem>
											<ListGroupItem>24/7 Support</ListGroupItem>
										</ListGroup>
									</Row>
								</CardBody>
								<CardFooter className="text-center">
									<Button
										className="btn-simple"
										href="dashboard/investment"
										color="primary"
									>
										Get Started
									</Button>
								</CardFooter>
							</Card>
						</Col>
						<Col md="4">
							<Card className="card-coin card-plain">
								<CardBody>
									<Row>
										<Col className="text-center" md="12">
											<h4 className="text-uppercase">SILVER COIN</h4>
											<span>Plan</span>
											<hr className="line-success" />
										</Col>
									</Row>
									<Row>
										<ListGroup>
											<ListGroupItem>5btc - 15btc</ListGroupItem>
											<ListGroupItem>+30% Profits </ListGroupItem>
											<ListGroupItem>24/7 Support</ListGroupItem>
										</ListGroup>
									</Row>
								</CardBody>
								<CardFooter className="text-center">
									<Button
										className="btn-simple"
										href="dashboard/investment"
										color="success"
									>
										Get Started
									</Button>
								</CardFooter>
							</Card>
						</Col>
						<Col md="4">
							<Card className="card-coin card-plain">
								<CardBody>
									<Row>
										<Col className="text-center" md="12">
											<h4 className="text-uppercase">Bright Coin</h4>
											<span>Plan</span>
											<hr className="line-info" />
										</Col>
									</Row>
									<Row>
										<ListGroup>
											<ListGroupItem>16btc - 23btc</ListGroupItem>
											<ListGroupItem>+50% </ListGroupItem>
											<ListGroupItem>24/7 Support</ListGroupItem>
										</ListGroup>
									</Row>
								</CardBody>
								<CardFooter className="text-center">
									<Button
										className="btn-simple"
										href="dashboard/investment"
										color="info"
									>
										Get Started
									</Button>
								</CardFooter>
							</Card>
						</Col>
					</Row>
				</Container>

				{/** world stats Us Div **/}
				<section className="pt-5">
					<h1 className="title text-center mt-5 text-white"> World Stats</h1>
					<h6
						className="text-center mx-auto text-white"
						style={{ maxWidth: "700px" }}
					>
						trading platform is a group of financial and cryptocurrency experts
						that invest in mining and cryptocurrency trading . We carefully
						examine the volatility of bitcoin and other cryptocurrencies, invest
						and make good profit from our investments.
					</h6>
					<WorldStats />
				</section>

				{/** Columns  **/}
				<Row className="align-items-center">
					{/**<Col md="4">Get Started Now</Col> **/}
					<Col>
						<img src={img4} alt="...." />
					</Col>
					<Col md="5">
						<h1 className="title text-white"> Get Started Now </h1>
						<Button
							className=" animation-on-hover"
							color="primary"
							size="lg"
							href="/dashboard/investment"
						>
							CLick Here
						</Button>
					</Col>
				</Row>

				{/** select Plan **/}
			</Container>
		</>
	);
}
const mapStateToProps = (state) => ({
	auth: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
	Login() {
		dispatch(Login());
	},
	Logout() {
		dispatch(Logout());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
