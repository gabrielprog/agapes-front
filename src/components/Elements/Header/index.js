import React from "react";

import { Col, Container, Row } from "react-bootstrap";

import logo from "../../../assets/images/logo.png";

function Header() {
	return (
		<Container className="h-25 p-3" fluid>
			<Row>
				<Col className="d-flex">
					<img src={logo} alt="Logo" />
					<div className="d-flex" style={{height: "50px"}}>
						<div className="vr bg-second"></div>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default Header;