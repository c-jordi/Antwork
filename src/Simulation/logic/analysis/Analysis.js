import generateField from "../utils/generateField";
import Connectivity from "./Connectivity";
import { uuid } from "../utils/tools";

function Analysis(env, walkers, nodes, database, events = []) {
	this.env = env;
	this.walkers = walkers;
	this.database = database;
	this.nodes = nodes;
	this.version = uuid();
	this.sessions = [this.version];
	this.combinedField = generateField(this.env.size, 0);
	this.maxima = {
		max: 1,
		min: 0,
	};
	this.maxMinThreshold = 1000;
	this.interval = 10;
	this.events = [];

	this.displayOptions = {
		showWalkers: false,
		showNodes: true,
		showCombinedFields: true,
		showPositiveField: false,
		showNegativeField: false,
		defaultColor: "#ffffff",
		positiveColor: "#f6ff33",
		negativeColor: "#33fff0",
		combinedColor: "#6a0dad",
	};

	// this.plot = new Plot(document.getElementById("canvas-plot"), {
	// 	name: "plot"
	// });

	this.fineGrain = 1;

	this.connectivity = new Connectivity(env, nodes, database);
}

Analysis.prototype.combineFields = function () {
	let combinedField = generateField(this.env.size, 0);
	for (var i = 0; i < this.env.size[0]; i++) {
		for (let j = 0; j < this.env.size[1]; j++) {
			combinedField[i][j] =
				this.env.fields.positive[0][i][j] + this.env.fields.negative[0][i][j];
		}
	}

	this.combinedField = combinedField;
};

Analysis.prototype.computeMaxima = function () {
	this.maxima.min = Math.min(...this.combinedField.flat());
	this.maxima.max = Math.max(...this.combinedField.flat());
	this.maxima.max =
		this.maxima.max < this.maxMinThreshold
			? this.maxMinThreshold
			: this.maxima.max;
};
Analysis.prototype.run = function () {
	this.combineFields();
	this.computeMaxima();
	this.checkEvents();
};

Analysis.prototype.checkEvents = function () {
	if (this.env.timeSinceStart % this.interval === 0) {
		this.edge();
	}
	this.events.forEach((event) => {
		if (this.env.timeSinceStart === event.t) {
			this.applyEvent(event);
		}
	});
};

Analysis.prototype.applyEvent = function (event) {
	switch (event.type) {
		case "node":
			this.nodes.toggle(event);
			break;
		case "parameter":
			this.env[event.name] = +event.value;
			break;
		default:
			break;
	}
};

Analysis.prototype.edge = function () {
	this.connectivity.run(this.combinedField, {
		time: this.env.timeSinceStart,
		version: this.version,
	});
};

Analysis.prototype.clear = function () {
	this.version = uuid();
	this.sessions.push(this.version);
	this.combinedField = generateField(this.env.size, 0);
};

export default Analysis;
