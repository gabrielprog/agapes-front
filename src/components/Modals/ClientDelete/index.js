import React, { useEffect, useState } from "react";

import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle
} from "react-bootstrap";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

import api from "../../../services/api";
import getToken from "../../../services/getToken";

import { formatCNPJ } from "../../../utils/formaters";
import { toast } from "react-toastify";

function ClientDelete( {show, handleClose, id} ) {

  const [data, setData] = useState({});
  
  const loadUserDetails = async() => {
    try {
      const response = await api.get(`/client/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      if (response.status === 200) {
        setData(response.data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/client/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      if (response.status === 204) {
        toast.success("Cliente excluído com sucesso!");
        handleClose();
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUserDetails();
  }, [show]);

  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Excluir</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form className="d-flex flex-column gap-3">
          <div className="alert alert-danger text-dark text-center w-100">
            Atenção! deseja realmente excluir o cliente {`${formatCNPJ(data.cnpj)} - ${data.name}`}?
          </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-success d-flex gap-1 align-items-center" onClick={() => handleDelete()}>
            <AiOutlineCheck size={18} />
            Sim
          </Button>
          <Button className="btn btn-danger d-flex gap-1 align-items-center" onClick={() => handleClose()}>
            <AiOutlineClose size={18} />
            Não
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ClientDelete;