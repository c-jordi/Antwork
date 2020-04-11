import React, { useState } from "react";
import { Switch, SubmitButton, IntInput } from "../Inputs";

const Settings = () => {
	const [settings, setSettings] = useState({ framesPerSecond: 30 });
	const inputFor = name => ({
		name,
		state: settings[name],
		setState: value => setSettings({ ...settings, [name]: value })
	});
	return (
		<div className="page settings">
			<div className="title">Settings</div>
			<div className="body">
				<div className="subtitle">Playback</div>
				<IntInput label={"FPS"} {...inputFor("framesPerSecond")}></IntInput>
				<div className="subtitle">Computation</div>
				<Switch
					label={"Worker parallelization"}
					{...inputFor("isWorkersActivated")}
				></Switch>
				<Switch
					label={"Run in the background"}
					{...inputFor("backgroundRun")}
				></Switch>
				<SubmitButton></SubmitButton>
			</div>
		</div>
	);
};

export default Settings;
