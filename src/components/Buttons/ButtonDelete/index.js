import React from "react";

function ButtonDelete({ children, onClick}) {
	return <button
		type="button"
		className="btn btn-danger"
		onClick={onClick}
	>{children}</button>;
}

export default ButtonDelete;