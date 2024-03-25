import React from "react";
import {
    Container,
    Navbar,
    NavDropdown
} from "react-bootstrap";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

function IconArrow() {
    return (
        <IoIosArrowDropdownCircle
		size={24} />
    );
}

function Dropmenu() {
    
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <>
            <Link to="/dashboard">
            <Navbar className="bg-body-tertiary">
                <Container>Inicio</Container>
            </Navbar>
            </Link>

            <Navbar className="bg-body-tertiary">
            {IconArrow()}
            <NavDropdown title="Cadastro" id="basic-nav-dropdown">
                <NavDropdown.Item><Link to={"/dashboard"}>Cliente</Link></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item><Link to="/">Produto</Link></NavDropdown.Item>
                </NavDropdown>
            </Navbar>

            <Navbar className="bg-body-tertiary">
            {IconArrow()}
                <NavDropdown title="Pedido" id="basic-nav-dropdown"></NavDropdown>
            </Navbar>

            <Navbar className="bg-body-tertiary">
            {IconArrow()}
            <NavDropdown title="Relatório" id="basic-nav-dropdown">
                <NavDropdown.Item><Link to="/dashboard/report/client">Cliente</Link></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item><Link to="/">Produto</Link></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item><Link to="/">Pedido</Link></NavDropdown.Item>
                </NavDropdown>
            </Navbar>

            
            <Navbar onClick={() => logout()} className="cursor-point bg-body-tertiary">
                <Container>Sair</Container>
            </Navbar>
        </>
    );
}

export default Dropmenu;