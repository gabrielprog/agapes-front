import React from "react";

import { Col, Container, FormControl, FormLabel } from "react-bootstrap";

function InputWithIcons({children, label, ...rest}) {
	return (
		<Col>
			<FormLabel>{label}<strong className="color-red">*</strong></FormLabel>
			<Container className="w-100 d-flex align-items-center rounded-3 bg-white px-3 gap-3">
				<FormControl {...rest} className="border-none shadow-none" />
				{children}
			</Container>
		</Col>
	);
}

export default InputWithIcons;
