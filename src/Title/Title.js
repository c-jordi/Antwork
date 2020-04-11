import React from "react";
import TotalMetrics from "./TotalMetrics";
import "./Title.css";

const Title = () => {
	return (
		<header className="App-header">
			<h2>Antwork</h2>
			<p>
				Welcome to Antwork, a simulation tool for path forming of feromone
				emitting brownian agents. The tool was developed during a semester
				project.
			</p>
			<TotalMetrics></TotalMetrics>
		</header>
	);
};

export default Title;
