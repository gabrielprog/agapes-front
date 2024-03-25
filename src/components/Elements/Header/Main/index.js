import React from "react";
import { useLocation } from "react-router-dom";

import { Col } from "react-bootstrap";

function friendlyPath(location) {
	return location.pathname
		.split("/")
		.filter(Boolean) 
		.map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
		.join(" > ");
}

function Main() {
	const location = useLocation();
    
	return (
		<Col className="bg-white border-bottom w-100 p-3">
			<span>{friendlyPath(location)}</span>
		</Col>
	);
}

export default Main;