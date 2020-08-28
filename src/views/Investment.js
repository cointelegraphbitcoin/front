import React from "react";
import { Container } from "reactstrap";

export default function Icons() {
	return (
		<div className="content">
			<div className="bg-default text-center text-white">
				<Container>
					<h1 className="pt-5 text-white"> INVESTMENT METHOD </h1>
					<h3 className="text-white">
						To complete your deposit, please send Bitcoin to the address below
						Due to the spread of the virus we only accept digital currency
						because of risk of spreading the virus in the bank:{" "}
					</h3>
					<div className="m-2">
						<img src={require("assets/img/scan.jpeg")} width="300" alt=""/>
					</div>

					<p className="font-bold title text-white">
						BTC Wallet : 3PD2snX159Ebm5FjmZMvb1Uye1MJoY9wtW
					</p>
					<p className="text-error pb-5 text-white title">
						(Min: 0.50 BTC, Max: 23 BTC)
					</p>
				</Container>
			</div>
		</div>
	);
}
