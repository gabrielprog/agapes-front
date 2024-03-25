/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { Container } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import ButtonDefault from "../../Buttons/ButtonDefault";

import api from "../../../services/api";
import getToken from "../../../services/getToken";

import { formatCNPJ, formatCode } from "../../../utils/formaters";
import pdfGenerator from "../../../utils/pdfGenerator";

function ReportBar() {

    const [selected, setSelected] = useState([]);
    const [options, setOptions] = useState([]);
    const [data, setData] = useState([]);
    const [searchId, setSearchId] = useState([]);

    const fetchClients = async () => {
        try {
            const response = await api.get(`/client/pdf`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });

            if (response.status === 200) {
                const clients = response.data.map(client => ({
                    id: client.id,
                    name: `${formatCode(client.id)} - ${client.name} - ${formatCNPJ(client.cnpj)}`
                }));
                
                setData(response.data);
                setOptions(clients);
            }
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    };

    const handlePrint = () => {
        let dataToPrint = [...data];

        if(searchId !== undefined && searchId !== null && searchId !== "") {
            dataToPrint = [data.find(client => client.id === searchId)];
        }
        
        pdfGenerator(dataToPrint);
    };

    useEffect(() => {
        fetchClients();
    }, []);
	
    return (
        <>
            <Container className="bg-light p-0 m-0 w-100 shadow rounded-2">
                <Container className="d-flex justify-content-between p-2 m-0 w-100">
                    <Container className="d-flex justify-content-start align-items-center gap-2">

                    <span>Cliente: </span>
                    <Typeahead
                    id="basic-typeahead-single"
                    labelKey="name"
                    onChange={(e) => setSearchId(e[0]?.id)}
                    options={options}
                    placeholder="Escolha o nome..."
                    defaultInputValue=""
                    />
                    </Container>

                    <Container className="d-flex gap-2 justify-content-end align-items-center">
                        
                        <ButtonDefault onClick={() => handlePrint()}>Imprimir</ButtonDefault>
                    </Container>
                </Container>
            </Container>

        </>
    );
}

export default ReportBar;