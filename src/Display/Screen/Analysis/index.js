import React, { useContext, useRef, useEffect } from "react";
import { statsContext } from "../../../Simulation/context/StatsContext";
import Plots from "./Plots";

const Analysis = ({ controller }) => {
	const { stats } = useContext(statsContext);
	const connectivityData = JSON.parse(
		JSON.stringify(stats.connectivity ? stats.connectivity : [])
	);

	return (
		<div className="page analysis">
			<div className="title">Connectivity</div>
			<div className="body">
				<Plots data={connectivityData}></Plots>
			</div>
		</div>
	);
};
export default Analysis;
