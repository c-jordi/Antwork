import React from "react";
import Preview from "./Preview";
import "./Documentation.css";
import MathJax from "react-mathjax";
import Header from "./Sections/Header";
import Introduction from "./Sections/Introduction";
import NetworkGeneration from "./Sections/NetworkGeneration";
import ComputationalModel from "./Sections/ComputationalModel";
import Implementation from "./Sections/Implementation";
import Analysis from "./Sections/Analysis";
import Bibliography from "./Sections/Bibliography";
import Conclusion from "./Sections/Conclusion";

const Documentation = () => {
	return (
		<div className="docs">
			<MathJax.Provider>
				<Header></Header>
				<Introduction></Introduction>
				<ComputationalModel></ComputationalModel>
				<NetworkGeneration></NetworkGeneration>
				<Implementation></Implementation>
				<Analysis></Analysis>
				<Conclusion></Conclusion>
				<Bibliography></Bibliography>
			</MathJax.Provider>
		</div>
	);
};

export default Documentation;
