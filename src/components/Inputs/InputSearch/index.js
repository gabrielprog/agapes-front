import React from "react";

function InputSearch( { placeholder, onChange, value }) {
	return <input 
            type="text" 
            className="form-control" 
            placeholder={placeholder} 
            onChange={onChange}
            value={value}
            />;
}

export default InputSearch;