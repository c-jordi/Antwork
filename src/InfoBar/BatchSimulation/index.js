import React, { useState } from "react";
import "./BatchSimulation.css";

const BatchSimulation = ({ controller }) => {
	const [frames, setFrames] = useState(1000);
	const [runs, setRuns] = useState(100);

	const onFramesChange = ({ target: { value } }) => {
		if (Number.isInteger(+value) && +value <= 10000 && +value >= 1) {
			setFrames(value);
		}
	};
	const onRunsChange = ({ target: { value } }) => {
		if (Number.isInteger(+value) && +value <= 100 && +value >= 1) {
			setRuns(value);
		}
	};

	const onClick = () => {
		const paramSubset = getParamSubset(controller);

		const query = { ...paramSubset, runs, frames };
		const serializedQuery = serialize(query);
		window.open(
			window.location.origin + `/api?${serializedQuery}`,
			"_blank",
			"directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=540,height=230"
		);
	};

	return (
		<React.Fragment>
			<span className="batch-label">Run Batch:</span>
			<input
				className="batch-frames"
				value={frames}
				defaultValue={200}
				onChange={onFramesChange}
				type="text"
				name="frames"
			/>
			<span className="batch-frames-label">frames</span>
			<input
				value={runs}
				className="batch-runs"
				onChange={onRunsChange}
				defaultValue={100}
				type="text"
				name="runs"
			/>
			<span className="batch-runs-label">runs</span>
			<div className="batch-submit" onClick={onClick}>
				Start
			</div>
		</React.Fragment>
	);
};

function getParamSubset(controller) {
	console.log("GETTING PARAM:", controller.nodes);
	const {
		walkers: { numberOfAgents },
		env: { alpha, beta, k, epsilon, s0 },
		nodes: { layoutId },
	} = controller;
	return {
		numberOfAgents,
		alpha,
		beta,
		k,
		epsilon,
		s0,
		layoutId,
	};
}

function getFormattedDate() {
	var date = new Date();
	var str =
		date.getFullYear() +
		"-" +
		(date.getMonth() + 1) +
		"-" +
		date.getDate() +
		" " +
		date.getHours() +
		":" +
		date.getMinutes() +
		":" +
		date.getSeconds();

	return str;
}

function serialize(obj) {
	var str = [];
	for (var p in obj)
		if (obj.hasOwnProperty(p)) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
	return str.join("&");
}

export default BatchSimulation;
