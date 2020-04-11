import React from "react";
import "./Preview.css";

const Preview = params => {
	return (
		<div className="preview" id={"preview" + params.id}>
			This is the preview
		</div>
	);
};

export default Preview;
