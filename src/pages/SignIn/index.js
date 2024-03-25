import React, { useEffect, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonDefault from "../../components/Buttons/ButtonDefault";
import InputWithIcons from "../../components/Inputs/InputWithIcons";

import api from "../../services/api";
import isAuthenticated from "../../services/isAuthenticated";

import banner from "../../assets/images/banner.png";
import logo from "../../assets/images/logo.png";

function SignIn() {

	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

	const changeValueLogin = () => {
		let value = login;
		value = value.replace(/\D/g, "");
		value = value.padEnd(8, "0");
		setLogin(value);
	};

	const isValidPassword = (value) => {
		if (value.length < 8 || value.length > 16) {
			return false;
		}
		if (!/[a-zA-Z]/.test(value)) {
			return false;
		}
		if (!/[A-Z]/.test(value)) {
			return false;
		}
		if (!/\d/.test(value)) {
			return false;
		}
		if (!/[@$#%&]/.test(value)) {
			return false;
		}
		return true;
	};
	
	const handleLogin = async () => {
		const data = {
			"login": login,
			"password": password
		};

		if(isValidPassword(password) === false) {
			toast.error("Senha inválida");
			return;
		}

		try {
			const response = await api.post("/user/authenticate", data);
			
			if (response.status === 200) {
				localStorage.setItem("token", response.data.accessToken);
				toast.success("Login realizado com sucesso!");
				navigate("/dashboard");
			}

		} catch (error) {
			if(error.response.status === 403) {
				toast.error("Usuário ou senha inválidos");
				return;
			}

			console.log(error);
		}
	};

	const handleClear = () => {
		setLogin("");
		setPassword("");
	};

	const handleKeyPress = (event, limit) => {
		if (event.target.value.length === limit) {
			event.preventDefault();
		}
	};

	useEffect(() => {
		async function checkLogin() {
			const isLogged = await isAuthenticated();
			if (isLogged) {
				navigate("/dashboard");
			}
		}
		checkLogin();
	}, []);

	return (
		<>
			<Container className="vh-100 w-100 d-flex justify-content-center align-items-center">
				<Row className="p-0 m-0 w-100">
					<Col xs={1} className='d-flex w-50 justify-content-center align-items-center p-0 m-0' id="sidebar-wrapper">
						<Container className='h-100 p-0 m-0'>
							<img className='rounded-3' src={banner} alt="art" style={{ width: "100%" }} />
						</Container>
					</Col>

					<Col xs={2} className="bg-primary h-auto p-0 m-0 w-50 h-100 d-flex justify-content-center align-items-center" id="page-content-wrapper">
						<Row className="w-50 p-2 gap-3">
							<img src={logo} alt="art" style={{ width: "100%" }} />

							<Col className="d-flex flex-column gap-3">
								<InputWithIcons onBlur={() => changeValueLogin()} onChange={e => setLogin(e.target.value)} value={login} label="Identificação do usuário: " type="number" onKeyPress={(e) => handleKeyPress(e, 8)} placeholder="Digite seu usuário">
									<FaUser />
								</InputWithIcons>

								<InputWithIcons onChange={e => setPassword(e.target.value)} value={password} label="Senha de usuário: " type={showPassword ? "text" : "password"} maxlength={16} placeholder="Digite sua senha">
									<IoEyeSharp onClick={() => setShowPassword(!showPassword)} className="cursor-point" size={20} />
								</InputWithIcons>

								<Col className="d-flex gap-3 align-items-center justify-content-center">
									<ButtonDefault onClick={() => handleLogin()} >Acessar</ButtonDefault>
									<ButtonDefault onClick={() => handleClear()} >Cancelar</ButtonDefault>
								</Col>

								<Col className="w-100 d-flex justify-content-end">
									<span className="color-red">* campos obrigatórios</span>
								</Col>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default SignIn;