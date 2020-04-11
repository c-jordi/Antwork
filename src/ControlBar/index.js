import React, { useState, useContext } from "react";
import { simulationContext } from "../Simulation/context/SimulationContext";
import { statsContext } from "../Simulation/context/StatsContext";
import "./ControlBar.css";
import PlayIcon from "./Icons/play.svg";
import PauseIcon from "./Icons/pause.svg";
import RestartIcon from "./Icons/refresh.svg";

const ControlBar = ({ Link }) => {
	const { controller } = useContext(simulationContext);
	const { stats } = useContext(statsContext);
	const togglePlay = () => {
		stats.running
			? controller.toggleEngine(false)
			: controller.toggleEngine(true);
		if (!stats.running) controller.startLoop();
	};

	const clickRestart = () => {
		controller.engine.restart();
	};

	const progressStyle = el => {
		const stage = Math.floor(stats.counter / 500) % 2;
		if (el) {
			return {
				backgroundColor: stage ? "#2196f3" : "#87caff",
				width: `${(stats.counter / 5) % 100}%`
			};
		}
		return { backgroundColor: stage ? "#87caff" : "#2196f3" };
	};

	return (
		<div className="control-bar">
			<img
				className="control-btn"
				alt={"play"}
				src={stats.running ? PauseIcon : PlayIcon}
				width="15px"
				onClick={togglePlay}
			></img>
			<Link className="progress-container" style={progressStyle(0)} to="/">
				<div className="progress-fill" style={progressStyle(1)}></div>
			</Link>
			<img
				className="control-btn"
				alt={"restart"}
				src={RestartIcon}
				width="15px"
				onClick={clickRestart}
			></img>
		</div>
	);
};

export default ControlBar;
