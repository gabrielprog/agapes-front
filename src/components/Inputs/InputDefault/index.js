import React from "react";

import { Col, FormControl, FormLabel } from "react-bootstrap";

function InputDefault({label, require, ...rest}) {
	return (
		<Col>
			<FormLabel>{label}<span className="color-red">{require ? "*":""}</span></FormLabel>
			<FormControl {...rest}/>
		</Col>
	);
}

export default InputDefault;
