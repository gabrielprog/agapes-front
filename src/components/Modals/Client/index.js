import React, { useEffect, useState } from "react";

import {
  Button,
  Col,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Row
} from "react-bootstrap";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import InputDefault from "../../Inputs/InputDefault";

import api from "../../../services/api";
import getToken from "../../../services/getToken";

import { formatCode } from "../../../utils/formaters";

function Client( {show, handleClose, edit, id} ) {
  const [formData, setFormData] = useState({
    code: "",
    nome: "",
    cnpj: "",
    rg: "",
    nascimento: "",
    endereco: "",
    complemento: "",
    bairro: "",
    cep: "",
    cidade: "",
    uf: "",
    telefone: "",
    celular: "",
    observacao: ""
  });

  const clearForm = () => {
    setFormData({
      nome: "",
      cnpj: "",
      rg: "",
      nascimento: "",
      endereco: "",
      complemento: "",
      bairro: "",
      cep: "",
      cidade: "",
      uf: "",
      telefone: "",
      celular: "",
      observacao: ""
    });
  };

  const setData = (data) => {
    setFormData({
      code: data.id,
      nome: data.name,
      cnpj: data.cnpj,
      rg: data.rg,
      nascimento: data.birth,
      endereco: data.address,
      complemento: data.complement,
      bairro: data.neighborhood,
      cep: data.postal,
      cidade: data.city,
      uf: data.ufstate,
      telefone: data.tel,
      celular: data.phone,
      observacao: data.observation
    });
  };

  const data = {
    "id": edit ? id : null,
    "name": formData.nome,
    "cnpj": formData.cnpj,
    "rg": formData.rg,
    "birth": formData.nascimento,
    "address": formData.endereco,
    "complement": formData.complemento,
    "neighborhood": formData.bairro,
    "postal": formData.cep,
    "city": formData.cidade,
    "ufstate": formData.uf,
    "tel": formData.telefone,
    "phone": formData.celular,
    "observation": formData.observacao
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validForm = () => {
    const errors = [];
  
    Object.entries(formData).forEach(([key, value]) => {
      if (value === "" && key !== "codigo" && key !== "observacao" && key !== "complemento" && key !== "nascimento" && key !== "cep" && key !== "telefone") {
        errors.push(key);
      }
    });
  
    return errors;
  };

  const handleRegister = async () => {
    const formError = validForm();
    
    if(Object.keys(formError).length > 0) {
      formError.forEach(field => {
        toast.error(`O campo "${field}" é obrigatório.`);
      });

      return;
    }

    try {
      const response = await api.post("/client", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        }
      });

      if (response.status === 200) {
        toast.success("Cliente cadastrado com sucesso!");
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }

  };

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

  const handleEdit = async () => {
    const formError = validForm();
    
    if(Object.keys(formError).length > 0) {
      formError.forEach(field => {
        toast.error(`O campo "${field}" é obrigatório.`);
      });

      return;
    }

    try {
      const response = await api.put("/client", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        }
      });

      if (response.status === 200) {
        toast.success("Cliente atualizado com sucesso!");
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    clearForm();
    
    if(edit)
      loadUserDetails();
  }, [show, edit]);

  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Detalhes do cliente</ModalTitle>
        </ModalHeader>
        <ModalBody>
        <Form className="d-flex flex-column gap-3">
          <Row>
            <Col><InputDefault disabled label="Código: " placeholder="Código" value={formatCode(parseInt(formData.code))} /></Col>
            <Col><InputDefault require={true} maxLength={40} label="Nome: " placeholder="Nome" onChange={(e) => handleChange(e)} name="nome" value={formData.nome} /></Col>
          </Row>
          <Row>
            <Col><InputDefault require={true} maxLength={14} label="CNPJ: " placeholder="CNPJ" onChange={(e) => handleChange(e)} name="cnpj" value={formData.cnpj} /></Col>
            <Col><InputDefault require={true} maxLength={17} label="RG: " placeholder="RG" onChange={(e) => handleChange(e)} name="rg" value={formData.rg} /></Col>
            <Col><InputDefault type="date" label="Nascimento: " placeholder="Nascimento" onChange={(e) => handleChange(e)} name="nascimento" value={formData.nascimento} /></Col>
          </Row>
          <Row>
            <Col><InputDefault require={true} maxLength={40} label="Endereço: " placeholder="Endereço" onChange={(e) => handleChange(e)} name="endereco" value={formData.endereco} /></Col>
            <Col><InputDefault label="Complemento: " placeholder="Complemento" onChange={(e) => handleChange(e)} name="complemento" value={formData.complemento} /></Col>
          </Row>
          <Row>
            <Col><InputDefault require={true} maxLength={20} label="Bairro: " placeholder="Bairro" onChange={(e) => handleChange(e)} name="bairro" value={formData.bairro} /></Col>
            <Col><InputDefault label="CEP: " maxLength={8} placeholder="CEP" onChange={(e) => handleChange(e)} name="cep" value={formData.cep} /></Col>
            <Col><InputDefault require={true} maxLength={20} label="Cidade: " placeholder="Cidade" onChange={(e) => handleChange(e)} name="cidade" value={formData.cidade} /></Col>
            <Col><InputDefault require={true} maxLength={2} label="UF: " placeholder="UF" onChange={(e) => handleChange(e)} name="uf" value={formData.uf} /></Col>
          </Row>
          <Row>
            <Col><InputDefault label="Telefone: " maxLength={13} placeholder="Telefone" onChange={(e) => handleChange(e)} name="telefone" value={formData.telefone} /></Col>
            <Col><InputDefault require={true} maxLength={15} label="Celular: " placeholder="Celular" onChange={(e) => handleChange(e)} name="celular" value={formData.celular} /></Col>
          </Row>
          <Row>
            <Col><InputDefault as="textarea" maxLength={150} label="Observação: " placeholder="Observação" onChange={(e) => handleChange(e)} name="observacao" value={formData.observacao} /></Col>
          </Row>
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => edit ? handleEdit() : handleRegister()} className="btn btn-primary d-flex gap-1 align-items-center">
            <AiOutlineCheck size={18} />
            Salvar
          </Button>
          <Button className="btn btn-danger d-flex gap-1 align-items-center" onClick={handleClose}>
            <AiOutlineClose size={18} />
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Client;