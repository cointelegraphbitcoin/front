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
					<p className="font-bold title text-white">
						BTC Wallet : 3DhJ97oV6xhabmGVykx9DSCDEtj9SLrgoG
					</p>
					<p className="text-error pb-5 text-white title">
						(Min: 0.10 BTC, Max: 23 BTC)
					</p>
				</Container>
			</div>
		</div>
	);
}
