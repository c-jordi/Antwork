import React from "react";
import Preview from "./Preview";
import "./Documentation.css";

const Documentation = () => {
	return (
		<div className="docs">
			<div className="text">
				<h1> Here is the title</h1>
			</div>

			<Preview id={"1"}></Preview>
		</div>
	);
};

export default Documentation;
