import React, { useState, useContext } from "react";
import { simulationContext } from "../Simulation/context/SimulationContext";
import { statsContext } from "../Simulation/context/StatsContext";
import BatchSimulation from "./BatchSimulation";
import BrightIcon from "./Icons/bright.svg";
import "./InfoBar.css";

const AntBar = numberOfAnts => {
	return (
		<div className="ant-container">
			{" "}
			{numberOfAnts}
			<span role="img" alt="Ant counter">
				🐜
			</span>
		</div>
	);
};

const InfoBar = () => {
	const { controller } = useContext(simulationContext);
	const {
		stats: { numberOfAnts }
	} = useContext(statsContext);
	const [contrast, setContrast] = useState(1);

	const changeContrast = ({ target: { value } }) => {
		controller.setContrast(+value);
		setContrast(+value);
	};
	return (
		<div className="info-bar">
			<BatchSimulation controller={controller}></BatchSimulation>
			<div style={{ flexGrow: 1 }}></div>
			{numberOfAnts ? AntBar(numberOfAnts) : ""}
			<img
				className="contrast-img"
				alt={"contrast"}
				src={BrightIcon}
				width="15px"
			></img>
			<div className="contrast-container">
				<input
					type="range"
					min="0"
					max="10"
					value={contrast}
					onChange={changeContrast}
					class="contrast-slider"
					id="contrastSlider"
				/>
			</div>
		</div>
	);
};

export default InfoBar;
