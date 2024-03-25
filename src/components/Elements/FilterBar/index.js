import React, { useState } from "react";

import { Container } from "react-bootstrap";
import ButtonDefault from "../../Buttons/ButtonDefault";
import ButtonDelete from "../../Buttons/ButtonDelete";
import InputSearch from "../../Inputs/InputSearch";
import ClientModal from "../../Modals/Client";

function FilterBar() {
	const [code, setCode] = useState("");
	const [client, setClient] = useState("");
	const [cnpj, setCnpj] = useState("");
	const [modalShow, setModalShow] = useState(false);

	const handleClear = () => {
		setCode("");
		setClient("");
		setCnpj("");
	};

	const handleClose = () => setModalShow(false);

	return (
		<>
			<ClientModal 
			show={modalShow} 
			handleClose={handleClose}
			/>
			<Container className="bg-light p-0 m-0 w-100 shadow rounded-2">
				<Container className="d-flex justify-content-between p-2 m-0 w-100">
					<Container className="d-flex justify-content-start">
						<ButtonDefault onClick={() => setModalShow(true)}>Cadastrar</ButtonDefault>
					</Container>

					<Container className="d-flex gap-2 justify-content-end align-items-center">
						<span>Filtrar por: </span>
						<InputSearch 
						onChange={e => setCode(e.target.value)} 
						value={code}
						placeholder="Código"
						/>
						<InputSearch 
						placeholder="Cliente" 
						onChange={e => setClient(e.target.value)}
						value={client}
						/>
						<InputSearch 
						placeholder="CNPJ" 
						onChange={e => setCnpj(e.target.value)}
						value={cnpj}
						/>

						<ButtonDelete onClick={() => handleClear()}>Limpar campos</ButtonDelete>
					</Container>
				</Container>
			</Container>
		</>
	);
}

export default FilterBar;