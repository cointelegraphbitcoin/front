import React from "react";
import {
	Row,
	Col,
	Container,
	Button,
	Card,
	CardBody,
	CardFooter,
} from "reactstrap";
import NavBar from "components/Navbars/RTLNavbar";

export default function About() {
	return (
		<>
			<div
				className="position-fixed bg-default"
				style={{ width: "100%", zIndex: 4 }}
			>
				<NavBar />
			</div>
			<Container className="pt-5 text-white">
				<Row xs="1" sm="1" className="align-items-center __h-screen mt-5">
					<Col>
						<img
							src="https://i2.wp.com/dailyhodl.com/wp-content/uploads/2020/04/wbg8239ie.jpg?fit=810%2C475&ssl=1"
							alt=""
							style={{ width: "100%", minWidth: "300px" }}
						/>
					</Col>
					<Col>
						<h1> About Us </h1>
						<h4 className="text-white">
							Icointraders trading platform is a group of financial and
							cryptocurrency experts that invest in mining and cryptocurrency
							trading . We carefully examine the volatility of bitcoin and other
							cryptocurrencies, invest and make good profit from our
							investments.
						</h4>
						<ol>
							<li>
								How we make profit from your investment when you deposit your
								investment, our traders after receiving it,start a new high rate
								instant trade. our traders can earn at least minimum profits
								from 10% to 20%per day while trading in a day. You are assured
								4% daily for a maximum number of 30days we will pay the
								guaranteed daily profit to your wallet daily or you can choose
								to withdraw to your personal online wallet daily .high amount
								deposit can help us to grow our company and our trade system,to
								encourage our investors we offer a bonus of 7% for every first
								investment from $500 and above.We know you care about your
								financial results,so we provide you with the best opportunities
								to achieve it because we respect the customer interests.
							</li>
							<li>
								how can we trust icointraders/How is it reliable? Our goal is to
								create an environment of real trust and partnership. They also
								have a five year plan,that shows they are here to
								stay.Impeccable adherence to the Customer interests helps them
								customize their investment solutions for achievement of your
								financial goals, and the value of our result is determined on
								the basis of meeting your expectations.
							</li>
						</ol>
					</Col>
				</Row>

				<Row xs="1" sm="1" className="align-items-center __h-screen">
					<Col>
						<h1 id="loanz"> Loans </h1>
						<h4>
							Icointraders crypto loan Is a short term Loan , this crypto loan
							facility is open to all adults whose State of residence allow
							cryptocurrency trading, therefore, any individual into or
							interested in cryptocurrency and has government issued ID/License
							can get this loan in 24hrs. To enjoy this loan, kindly visit our
							loan section or click the button below to learn more about the
							loan right away
						</h4>
						<Button color="success">Request Loan</Button>
					</Col>
					<Col>
						<img
							src={require("assets/img/loans.jpg")}
							alt=""
							style={{ width: "100%", minWidth: "300px" }}
						/>
					</Col>
				</Row>
				<h1 className="title text-center text-white">Our Team</h1>

				<Row xs="1" sm="1">
					<Col>
						<Card>
							<CardBody>
								<img
									src="https://blogs-images.forbes.com/lisaearlemcleod/files/2017/03/Lisa-Earle-McLeod_avatar_1489684790-400x400.jpg"
									alt="loading..."
								/>
							</CardBody>
							<CardFooter>
								<h4 className="text-center mb-0"> Alex Fegurson </h4>
								<p className="text-center mt-0"> Sales Representative </p>
							</CardFooter>
						</Card>
					</Col>
					<Col>
						<Card>
							<CardBody>
								<img
									src="https://blogs-images.forbes.com/lisaearlemcleod/files/2017/03/Lisa-Earle-McLeod_avatar_1489684790-400x400.jpg"
									alt="loading..."
								/>
							</CardBody>
							<CardFooter>
								<h4 className="text-center mb-0"> Alex Fegurson </h4>
								<p className="text-center mt-0"> Sales Representative </p>
							</CardFooter>
						</Card>
					</Col>
					<Col>
						<Card>
							<CardBody>
								<img
									src="https://blogs-images.forbes.com/lisaearlemcleod/files/2017/03/Lisa-Earle-McLeod_avatar_1489684790-400x400.jpg"
									alt="loading..."
								/>
							</CardBody>
							<CardFooter>
								<h4 className="text-center mb-0"> Alex Fegurson </h4>
								<p className="text-center mt-0"> Sales Representative </p>
							</CardFooter>
						</Card>
					</Col>
					<Col>
						<Card>
							<CardBody>
								<img
									src="https://blogs-images.forbes.com/lisaearlemcleod/files/2017/03/Lisa-Earle-McLeod_avatar_1489684790-400x400.jpg"
									alt="loading..."
								/>
							</CardBody>
							<CardFooter>
								<h4 className="text-center mb-0"> Alex Fegurson </h4>
								<p className="text-center mt-0"> Sales Representative </p>
							</CardFooter>
						</Card>
					</Col>
				</Row>
			</Container>
			<Container className="py-5">
				<h1 className="title text-center"> Send us a Message</h1>
				<div className="text-center">
					<Button size="lg"> Send Us a Message </Button>
				</div>
			</Container>
		</>
	);
}
