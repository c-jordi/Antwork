import React, { useState } from "react";
import { IntInput, PairIntInput, FloatInput, SubmitButton } from "../Inputs";

const Environment = ({ controller, closeMenu }) => {
	const [state, setState] = useState(controller.getEnv());
	const inputFor = (name, restart) => ({
		name,
		state: state[name],
		setState: value => {
			setState({
				...state,
				[name]: value,
				modified: true,
				restart: restart | state.restart
			});
		}
	});
	const onSave = () => {
		controller.setEnv(state, state.restart);
		setState({ ...state, modified: false, restart: undefined });
		closeMenu();
	};
	return (
		<div className="page environment">
			<div className="title">Environment</div>
			<div className="body">
				<IntInput
					max={10000}
					min={0}
					label={"Agents"}
					{...inputFor("numberOfAgents")}
				></IntInput>
				<PairIntInput
					label={"Size"}
					max={150}
					min={0}
					placeholder={[60, 60]}
					{...inputFor("size", true)}
				></PairIntInput>
				<div className="subtitle">Additional parameters</div>
				<div className="row">
					<div className="col">
						<FloatInput
							max={2}
							min={0}
							label={"Alpha"}
							{...inputFor("alpha")}
						></FloatInput>
						<FloatInput
							max={2}
							min={0}
							label={"Epsilon"}
							{...inputFor("epsilon")}
						></FloatInput>
						<IntInput
							max={10000}
							min={0}
							label={"S0"}
							{...inputFor("s0")}
						></IntInput>
					</div>
					<div className="col">
						<FloatInput
							max={2}
							min={0}
							label={"Beta"}
							{...inputFor("beta")}
						></FloatInput>
						<FloatInput
							max={2}
							min={0}
							label={"K"}
							{...inputFor("k")}
						></FloatInput>
					</div>
				</div>
				{state.modified && (
					<SubmitButton
						label={state.restart ? "Restart" : "Apply"}
						onClick={onSave}
					></SubmitButton>
				)}
				<div className="subtitle">Governing equations</div>
			</div>
		</div>
	);
};

export default Environment;
