import React from "react";
import "./Inputs.css";

export const TextInput = ({ name, state, setState, label }) => {
	const handleChange = ({ target: { value } }) => {
		setState(value);
	};
	return (
		<div className="input-container">
			<div className="input-label">{label}</div>
			<input
				className="text-input"
				value={state}
				onChange={handleChange}
			></input>
		</div>
	);
};

export const FloatInput = ({
	name,
	state,
	setState,
	label,
	max,
	min,
	placeholder,
	maxDigits = 6
}) => {
	const handleChange = ({ target: { value } }) => {
		if (value === ".") {
			value = "0.";
		}
		if (value.length >= maxDigits) return;
		if (!isNaN(+value)) {
			if ((+value < max) & (+value >= min)) {
				setState(value);
			}
		}
	};
	return (
		<div className="input-container">
			<div className="input-label">{label}</div>
			<input
				className="number-input"
				value={state ? state : ""}
				onChange={handleChange}
				placeholder={placeholder ? placeholder : "0"}
			></input>
		</div>
	);
};

export const PairIntInput = ({
	name,
	state,
	setState,
	label,
	max,
	min,
	placeholder
}) => {
	const handleChange = ind => ({ target: { value } }) => {
		let stateCopy = state ? state : Array(2).fill(0);
		if (Number.isInteger(+value)) {
			if ((+value < max) & (+value >= min)) {
				stateCopy[ind] = +value;
				setState(stateCopy);
			}
		}
	};
	return (
		<div className="input-container">
			<div className="input-label">{label}</div>
			<div className="pair-input">
				<input
					className="number-input"
					value={state ? state[0] : ""}
					onChange={handleChange(0)}
					placeholder={placeholder ? placeholder[0] : "0"}
				></input>
				<span className="sep-input">,</span>
				<input
					className="number-input"
					value={state ? state[1] : ""}
					onChange={handleChange(1)}
					placeholder={placeholder ? placeholder[1] : "0"}
				></input>
			</div>
		</div>
	);
};
export const IntInput = ({
	name,
	state,
	setState,
	label,
	max,
	min,
	placeholder
}) => {
	const handleChange = ({ target: { value } }) => {
		if (Number.isInteger(+value)) {
			if ((+value < max) & (+value >= min)) {
				setState(value);
			}
		}
	};
	return (
		<div className="input-container">
			<div className="input-label">{label}</div>
			<input
				className="number-input"
				value={state ? state : ""}
				onChange={handleChange}
				placeholder={placeholder ? placeholder : "0"}
			></input>
		</div>
	);
};

export const SubmitButton = ({ label, onClick, active }) => {
	return (
		<button
			onClick={onClick}
			className={"submit-button" + (active ? "" : " inactive")}
		>
			{label ? label : "Save"}
		</button>
	);
};

export const ColorInput = ({ label, state, setState }) => {
	const getColor = color => {
		const s = new Option().style;
		s.color = color;
		return s.color;
	};
	const handleChange = ({ target: { value } }) => {
		value = "#" + value.split("#").join("");
		if (value.length >= 8) return;
		setState(value);
	};
	return (
		<div className="input-container">
			<div className="input-label">{label}</div>
			<input
				className="color-input"
				value={state ? state : ""}
				onChange={handleChange}
				placeholder={"#"}
				style={{ backgroundColor: getColor(state) }}
			></input>
		</div>
	);
};

export const Switch = ({ name, state, setState, label }) => {
	const handleClick = () => {
		setState(!state);
	};
	return (
		<div className="input-container">
			<div className="input-label">{label}</div>
			<label className="switch">
				<input
					type="checkbox"
					defaultChecked={state ? state : false}
					onChange={handleClick}
				></input>
				<span className="slider round"></span>
			</label>
		</div>
	);
};

function isFloat(mixedVar) {
	return +mixedVar === mixedVar && (!isFinite(mixedVar) || !!(mixedVar % 1));
}

function isColor(strColor) {
	var s = new Option().style;
	s.color = strColor;
	return s.color === strColor;
}

function rgbToHex(rgb) {
	let hex = Number(rgb).toString(16);
	if (hex.length < 2) {
		hex = "0" + hex;
	}
	return hex;
}

function fullColorHex(r, g, b) {
	const red = rgbToHex(r);
	const green = rgbToHex(g);
	const blue = rgbToHex(b);
	return red + green + blue;
}

function rgbToFullHex(string) {
	const [r, g, b] = string
		.replace("rgba(", "")
		.replace("rgb(", "")
		.replace(")", "")
		.split(",");
	return fullColorHex(r, g, b);
}
