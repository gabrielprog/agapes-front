import React from "react";

import { Container, Row } from "react-bootstrap";
import ReportBar from "../../Elements/ReportBar";
import Title from "../../Elements/Title";

function Report() {
	return (
		<Row className="d-flex gap-3">
			<Container>
				<Title>Relação de clientes</Title>
			</Container>

			<Container>
				<ReportBar />
			</Container>
        
		</Row>
	);
}

export default Report;