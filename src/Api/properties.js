import layouts, { customSwitch } from "../layout";

export function getEnvironment(query) {
	const { alpha, beta, k, epsilon, s0 } = query;
	return { alpha, beta, k, epsilon, s0, layout: {} };
}

export function findPreset(layoutId, size) {
	const preset = loadPreset(layoutId);
	preset.size = sizeArray(size);
	return preset;
}

function sizeArray(size) {
	return size.split(",").map((el) => +el);
}

function loadPreset(layoutId) {
	const preset = layouts.find(({ name }) => name === layoutId);
	if (preset === undefined) {
		return customSwitch(layoutId);
	}
	return preset;
}

export function download(filename, text) {
	var element = document.createElement("a");
	element.setAttribute(
		"href",
		"data:text/plain;charset=utf-8," + encodeURIComponent(text)
	);
	element.setAttribute("download", filename);
	element.style.display = "none";
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}
