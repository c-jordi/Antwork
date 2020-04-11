import React, { createContext } from "react";
import Environment from "../logic/environment/Environment";
import WalkingSquad from "../logic/walkers/WalkingSquad";
import Nodes from "../logic/nodes/Nodes";
import Engine from "../logic/engine/Engine";
import Analysis from "../logic/analysis/Analysis";
import Database from "../logic/analysis/Database";
import Controller from "../logic/controller/Controller";

import { generateFig3 } from "../logic/playgrounds/fig3";
import "../logic/utils/prototypes";

export const simulationContext = createContext();

export const SimulationContextProvider = ({ children }) => {
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
		nodes
	});

	const walkers = new WalkingSquad(500, envir, "rand", "rand", 0);
	const database = new Database("Walker Metrics");
	const analysis = new Analysis(envir, walkers, nodes, database);
	const engine = new Engine(envir, walkers, "euler", database, analysis);
	const controller = new Controller({
		walkers: walkers,
		analysis: analysis,
		engine: engine,
		env: envir,
		nodes
	});

	return (
		<simulationContext.Provider value={{ controller }}>
			{children}
		</simulationContext.Provider>
	);
};
