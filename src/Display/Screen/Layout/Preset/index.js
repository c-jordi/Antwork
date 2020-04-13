import React, { useRef, useEffect, useContext } from "react";
import { simulationContext } from "../../../../Simulation/context/SimulationContext";
import { drawNodes } from "./draw";
import "./Preset.css";

const Preset = ({ title, nodes, size, params, events, closeMenu, name }) => {
	const canvasRef = useRef();
	const { controller } = useContext(simulationContext);
	const onClick = () => {
		controller.setLayout(nodes, size, params, name, events);
		closeMenu();
	};

	useEffect(() => {
		drawNodes(canvasRef.current, nodes, size);
	});

	return (
		<div className="preset">
			<div className="preset-size">
				{size[0]}x{size[1]}
			</div>
			<div className="preset-preview" onClick={onClick}>
				<canvas ref={canvasRef} height={80} width={70}></canvas>
			</div>
			<div className="preset-title">{title}</div>
		</div>
	);
};

export const PresetBox = ({ children }) => {
	return <div className="preset-container">{children}</div>;
};

export default Preset;
