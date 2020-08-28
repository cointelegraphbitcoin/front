import React from "react";
// used for making the prop types of this component

class Footer extends React.Component {
	render() {
		return (
			<div
				style={{
					padding: 0,
					textAlign: "center",
					position: "relative",
					marginTop: "30px",
					paddingBottom: "35px",
					paddingTop: "30px",
					background: "#16161f",
				}}
			>
				© {new Date().getFullYear()} all rights reserved by{" "}
				<a href="/">cointelegraphbitcoin</a>
			</div>
		);
	}
}

export default Footer;
