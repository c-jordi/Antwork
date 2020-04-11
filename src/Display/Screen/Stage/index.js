import React, { useContext } from "react";
import { simulationContext } from "../../../Simulation/context/SimulationContext";
import { statsContext } from "../../../Simulation/context/StatsContext";
import NativeStage from "./native/index";
import "./Stage.css";

const Stage = ({ width }) => {
	const { controller } = useContext(simulationContext);
	const { updateStats } = useContext(statsContext);

	const fixHeight = width => {
		const height = Math.ceil(
			(width / controller.env.size[0]) * controller.env.size[1]
		);
		if (height / width < 0.8) return Math.floor(width * 0.8);
		if (height / width > 1.3) return Math.floor(width * 1.3);
		return height;
	};

	const height = fixHeight(width);

	return (
		<div className="stage-container" style={{ height }}>
			<NativeStage
				controller={controller}
				updateStats={updateStats}
				width={width}
				height={height}
			></NativeStage>
			<div className="stage-overlay">Frame: {controller.engine.counter}</div>
		</div>
	);
};

export default Stage;
