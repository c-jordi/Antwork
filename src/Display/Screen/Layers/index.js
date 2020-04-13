import React, { useState } from "react";
import { Switch, ColorInput } from "../Inputs";

const Layers = ({ controller }) => {
	const [state, setState] = useState(controller.getLayers());
	const inputFor = (name) => ({
		name,
		state: state[name],
		setState: (value) => {
			console.log("Setting:", name, value);
			controller.setLayers(name, value);
			setState({ ...state, [name]: value });
		},
	});
	return (
		<div className="page layers">
			<div className="title">Layers</div>
			<div className="body">
				<Switch label={"Walkers"} {...inputFor("showWalkers")}></Switch>
				<Switch label={"Nodes"} {...inputFor("showNodes")}></Switch>
				<Switch
					label={"Combined field"}
					{...inputFor("showCombinedFields")}
				></Switch>
				<Switch
					label={"Positive field"}
					{...inputFor("showPositiveField")}
				></Switch>
				<Switch
					label={"Negative field"}
					{...inputFor("showNegativeField")}
				></Switch>

				<div className="subtitle">Colors</div>
				<ColorInput label={"Agents"} {...inputFor("defaultColor")}></ColorInput>
				<ColorInput
					label={"Combined"}
					{...inputFor("combinedColor")}
				></ColorInput>
				<ColorInput
					label={"Positive"}
					{...inputFor("positiveColor")}
				></ColorInput>
				<ColorInput
					label={"Negative"}
					{...inputFor("negativeColor")}
				></ColorInput>
				<div className="subtitle">Options</div>
				<Switch label={"Slow Motion"} {...inputFor("slowMo")}></Switch>
			</div>
		</div>
	);
};

export default Layers;
