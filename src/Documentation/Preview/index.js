import React, { useContext, useRef, useEffect } from "react";
import { simulationContext } from "../../Simulation/context/SimulationContext";
import { withRouter } from "react-router-dom";

import layouts from "../../layout";
import { drawNodes } from "./draw";
import "./Preview.css";

const Preview = (props) => {
	const { params } = props;
	const { controller } = useContext(simulationContext);
	const imgRef = useRef();
	const preset = layouts.find((preset) => preset.name === params.name);

	const handleClick = () => {
		controller.setLayout(
			preset.nodes,
			preset.size,
			preset.params,
			preset.events,
			preset.name
		);
		console.log(props.history);
		props.history.push("../");
	};

	useEffect(() => {
		drawNodes(imgRef.current, preset.nodes, preset.size);
	});

	return (
		<div className="preview-container" onClick={handleClick}>
			<div className="preview" id={"preview" + params.id}>
				<div className="preview-img">
					<canvas height={100} width={100} ref={imgRef}></canvas>
				</div>
				<div className="preview-text">
					<div className="p-title">
						<span className="p-label">Title:</span> {params.title}
					</div>
					<div className="p-body">
						<span className="p-label">Desc:</span> {params.text}
					</div>
				</div>
			</div>
			<div className="subtitle">Click above to run the simulation...</div>
		</div>
	);
};

export default withRouter(Preview);
