import React from "react";

import {
	Col,
	Container,
	Row
} from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

import Client from "../../components/Content/Client";
import Report from "../../components/Content/Report";
import Dropmenu from "../../components/Elements/Dropmenu";
import Header from "../../components/Elements/Header";
import HeaderMain from "../../components/Elements/Header/Main";


function Dashboard() {
	
	return (
		<>
			<Header />

			<Container className="vh-100 w-100 d-flex m-0 p-0" fluid>
				<Row className="p-0 m-0 w-100">
					<Col xs={1} className='d-flex w-25 bg-third p-2 m-0 justify-content-center' id="sidebar-wrapper">
						<Container className="p-0 m-0 w-100">
							<Dropmenu />
						</Container>
					</Col>

					<Col xs={2} className="bg-white h-auto w-75 h-100 " id="page-content-wrapper">
						<Row className="p-0 gap-3 w-100">
							<HeaderMain />

							<Routes>
								<Route path="/" element={<Client />} />
								<Route path="/report/client" element={<Report />} />
							</Routes>
							
						</Row>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Dashboard;