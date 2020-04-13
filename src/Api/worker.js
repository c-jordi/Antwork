import Environment from "../Simulation/logic/environment/Environment";
import Nodes from "../Simulation/logic/nodes/Nodes";
import Engine from "../Simulation/logic/engine/Engine";
import Analysis from "../Simulation/logic/analysis/Analysis";
import Database from "../Simulation/logic/analysis/Database";
import Controller from "../Simulation/logic/controller/Controller";
import WalkingSquad from "../Simulation/logic/walkers/WalkingSquad";
import { getEnvironment } from "./properties";

self.addEventListener(
	"message",
	function (e) {
		var data = e.data;
		switch (data.fn) {
			case "start":
				init(data);
				break;
			default:
				self.postMessage("Unknown command: " + data.msg);
		}
	},
	false
);

function sendBackData(data) {
	if (data.name === "connectivity") {
		self.postMessage({
			fn: "update",
			data: [data.value.time, data.value.E, data.value.version],
		});
	}
}

function init(data) {
	const { frames, runs, query, preset } = data;
	const nodes = new Nodes();
	nodes.default();
	const envir = new Environment({
		alpha: 1,
		k: 0.03,
		beta: 0.2,
		epsilon: 0.5,
		s0: 10000,
		framerate: 1,
		layout: {},
		nodes,
		...getEnvironment(query),
	});
	const walkers = new WalkingSquad(
		query.numberOfAgents,
		envir,
		"rand",
		"rand",
		0
	);

	const database = new Database("Walker Api Metrics", sendBackData);
	const analysis = new Analysis(envir, walkers, nodes, database);
	const engine = new Engine(envir, walkers, "euler", database, analysis);
	const controller = new Controller({
		walkers: walkers,
		analysis: analysis,
		engine: engine,
		env: envir,
		nodes,
		worker: true,
	});
	controller.setLayout(preset.nodes, preset.size, {});

	runSimulation(controller, frames, runs);

	self.postMessage({ fn: "done" });
}

function runSimulation(controller, frames, runs) {
	controller.toggleEngine(true);

	for (let run = 0; run < runs; run++) {
		for (let frame = 0; frame < frames; frame++) {
			controller.engine.next();
			controller.analysis.run();
		}
		controller.engine.restart();
		controller.analysis.clear();
	}
}
