import React from "react";

import { Container, Row } from "react-bootstrap";

import MainClient from "../../Elements/MainClient";
import Title from "../../Elements/Title";

function Client() {
	return (
		<Row className="d-flex gap-3">
			<Container>
				<Title>Cliente</Title>
				<span>Cadastrar, consultar, alterar e excluir um cliente</span>
			</Container>

			<Container>
				<MainClient />
			</Container>
        
		</Row>
	);
}

export default Client;