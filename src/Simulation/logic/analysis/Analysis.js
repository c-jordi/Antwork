import generateField from "../utils/generateField";
import Connectivity from "./Connectivity";

function Analysis(env, walkers, nodes, database) {
	this.env = env;
	this.walkers = walkers;
	this.database = database;
	this.nodes = nodes;

	this.combinedField = generateField(this.env.size, 0);
	this.maxima = {
		max: 1,
		min: 0
	};
	this.maxMinThreshold = 1000;

	this.displayOptions = {
		showWalkers: false,
		showNodes: true,
		showCombinedFields: true,
		showPositiveField: false,
		showNegativeField: false,
		defaultColor: "#ffffff",
		positiveColor: "#f6ff33",
		negativeColor: "#33fff0",
		combinedColor: "#6a0dad"
	};

	// this.plot = new Plot(document.getElementById("canvas-plot"), {
	// 	name: "plot"
	// });

	this.fineGrain = 1;

	this.connectivity = new Connectivity(this.env, this.database);
}

Analysis.prototype.combineFields = function() {
	let combinedField = generateField(this.env.size, 0);
	for (var i = 0; i < this.env.size[0]; i++) {
		for (let j = 0; j < this.env.size[1]; j++) {
			combinedField[i][j] =
				this.env.fields.positive[0][i][j] + this.env.fields.negative[0][i][j];
		}
	}

	this.combinedField = combinedField;
};

Analysis.prototype.computeMaxima = function() {
	this.maxima.min = Math.min(...this.combinedField.flat());
	this.maxima.max = Math.max(...this.combinedField.flat());
	this.maxima.max =
		this.maxima.max < this.maxMinThreshold
			? this.maxMinThreshold
			: this.maxima.max;
};
Analysis.prototype.run = function() {
	this.combineFields();
	this.computeMaxima();
	if (this.env.timeSinceStart % 20 == 0) {
		this.edge();
	}
};

Analysis.prototype.edge = function() {
	const { time, y } = this.connectivity.run(this.combinedField, {
		time: this.env.timeSinceStart
	});
};

Analysis.prototype.plot = function(variable) {
	// eg: variable = "connectivity"
};

Analysis.prototype.clear = function() {
	this.combinedField = generateField(this.env.size, 0);
};

function download(filename, text) {
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

export default Analysis;
