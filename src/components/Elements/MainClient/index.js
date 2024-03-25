import React, { useEffect, useState } from "react";

import { Container } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineFilter } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaArrowLeft, FaArrowRight } from "react-icons/fa";

import ButtonDefault from "../../Buttons/ButtonDefault";
import ButtonDelete from "../../Buttons/ButtonDelete";
import ClientModal from "../../Modals/Client";
import ClientDelete from "../../Modals/ClientDelete";

import api from "../../../services/api";
import getToken from "../../../services/getToken";

import { formatCNPJ, formatCode } from "../../../utils/formaters";
import InputSearch from "../../Inputs/InputSearch";

function MainClient() {
    
	const [modalShow, setModalShow] = useState(false);
    const [modalDeleteShow, setModalDeleteShow] = useState(false);
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [clientId, setClientId] = useState(0);
    const [edit, setEdit] = useState(false);

    const [codeSearch, setCodeSearch] = useState("");
    const [clientNameSearch, setClientNameSearch] = useState("");
    const [clientCNPJSearch, setClientCNPJSearch] = useState("");

    const [sortType, setSortType] = useState("");
    const [sortedBy, setSortedBy] = useState("");

	const handleClose = () => setModalShow(false);
    const handleDeleteClose = () => setModalDeleteShow(false);

    const handleClear = () => {
		setCodeSearch("");
		setClientNameSearch("");
		setClientCNPJSearch("");
	};

    const handleCodeSearch = (e) => {
        setSortType("");
        setSortedBy("");
        setClientNameSearch("");
        setClientCNPJSearch("");
        setCodeSearch(e.target.value);
    };

    const handleNameSearch = (e) => {
        setSortType("");
        setSortedBy("");
        setCodeSearch("");
        setClientCNPJSearch("");
        setClientNameSearch(e.target.value);
    };

    const handleCNPJSearch = (e) => {
        setSortType("");
        setSortedBy("");
        setCodeSearch("");
        setClientNameSearch("");
        setClientCNPJSearch(e.target.value);
    };

    const fetchClients = async () => {

        try {
            const response = await api.get(`/client?page=${currentPage}&qname=${clientNameSearch}&qcode=${codeSearch}&qcnpj=${clientCNPJSearch}&sort=${sortedBy}&type=${sortType}` , {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            
            if (response.status === 200) {
                setData(response.data.content);
                setTotalPages(response.data.totalPages);
            }
        } catch (error) {
            console.log(error);
        }
        
    };

    const nextPage = () => {
        if (currentPage === totalPages - 1) {
            return;
        }
        setCurrentPage(currentPage + 1);
    };

    const previousPage = () => {
        if (currentPage === 0) {
            return;
        }

        setCurrentPage(currentPage - 1);
    };

    const handleEdit = (id) => {
        setClientId(id);
        setEdit(true);
        setModalShow(true);
    };

    const handleDelete = (id) => {
        setClientId(id);
        setModalDeleteShow(true);
    };

    const handleCreateMode = () => {
        setEdit(false);
        setModalShow(true);
    };

    const handleSort = (field) => {
        if (field === sortedBy) {
          setSortType(sortType === "asc" ? "desc" : "asc");
        } else {
          setSortedBy(field);
          setSortType("asc");
        }
      };

    useEffect(() => {
        fetchClients();
    }, [currentPage, codeSearch, clientNameSearch, clientCNPJSearch, sortType, sortedBy]);

    return (
        <Container className="w-100 d-flex flex-column gap-4">
            <ClientModal 
            show={modalShow} 
            handleClose={handleClose}
            id={clientId}
            edit={edit}
            />
            <ClientDelete 
            show={modalDeleteShow} 
            id={clientId}
            handleClose={handleDeleteClose}
            />

            
            <Container className="bg-light p-0 m-0 w-100 shadow rounded-2">
                <Container className="d-flex justify-content-between p-2 m-0 w-100">
                    <Container className="d-flex justify-content-start">
                        <ButtonDefault onClick={() => handleCreateMode()}>Cadastrar</ButtonDefault>
                    </Container>

                    <Container className="d-flex gap-2 justify-content-end align-items-center">
                        <span>Filtrar por: </span>
                        <InputSearch 
                        onChange={(e) => handleCodeSearch(e)} 
                        value={codeSearch}
                        placeholder="Código"
                        />
                        <InputSearch 
                        placeholder="Cliente" 
                        onChange={(e) => handleNameSearch(e)}
                        value={clientNameSearch}
                        />
                        <InputSearch 
                        placeholder="CNPJ" 
                        onChange={(e) => handleCNPJSearch(e)}
                        value={clientCNPJSearch}
                        />

                        <ButtonDelete onClick={() => handleClear()}>Limpar campos</ButtonDelete>
                    </Container>

                </Container>
            </Container>

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                    <th scope="col" onClick={() => handleSort("id")}>
                        Código <AiOutlineFilter />
                    </th>
                    <th scope="col" onClick={() => handleSort("name")}>
                        Nome <AiOutlineFilter />
                    </th>
                    <th scope="col" onClick={() => handleSort("CNPJ")}>
                        CNPJ <AiOutlineFilter />
                    </th>
                    <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                        {data.map((client) => (
                            <tr key={client.id}>
                            <th>{formatCode(client.id)}</th>
                            <td>{client.name}</td>
                            <td>{formatCNPJ(client.cnpj)}</td>
                            <td>
                                <Container className="d-flex gap-2">
                                    <ButtonDefault onClick={() => handleEdit(client.id)}> <BiSolidEdit size={18} /> </ButtonDefault>
                                    <ButtonDelete onClick={() => handleDelete(client.id)}> <AiOutlineDelete size={18} /> </ButtonDelete>
                                </Container>
                            </td>
                            </tr>
                            )
                        )}
                </tbody>

                <tfoot>
                    <tr>
                        <td colSpan="4">
                            <Container className="d-flex justify-content-center gap-2">
                                
                                <ButtonDefault onClick={() => setCurrentPage(0)}> <FaAngleDoubleLeft size={18} /> </ButtonDefault>
                                <ButtonDefault onClick={() => previousPage()}> <FaArrowLeft size={18} /> </ButtonDefault>

                                <span className="d-flex align-items-center">{currentPage + 1} de {totalPages}</span>
                                
                                <ButtonDefault onClick={() => nextPage()}> <FaArrowRight size={18} /> </ButtonDefault>
                                <ButtonDefault onClick={() => setCurrentPage(totalPages - 1)}> <FaAngleDoubleRight size={18} /> </ButtonDefault>
                            
                            </Container>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </Container>
    );
}

export default MainClient;