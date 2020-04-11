import Loop from "../animation/Loop";

function Controller({ walkers, analysis, engine, env, nodes }) {
	this.walkers = walkers;
	this.analysis = analysis;
	this.engine = engine;
	this.nodes = nodes;
	this.env = env;
	this.loop = undefined;
	this.loopCallback = undefined;

	// Keeps track of updates
	this.updates = {
		ui: 0,
		game: 0,
		back: 0
	};
	this.setRequestId = this.setRequestId.bind(this);
	this.useCallback = this.useCallback.bind(this);
	this.toggleEngine = this.toggleEngine.bind(this);
	this.setContrast = this.setContrast.bind(this);
}

///////////////////////////////////////////////////////////////
//  INTERFACE SETTINGS GETTERS AND SETTERS   			  /////
///////////////////////////////////////////////////////////////

/**
 * Gets the variables of the environment
 */
Controller.prototype.getEnv = function(obj) {
	const { size, alpha, beta, k, epsilon, s0 } = this.env;
	const { numberOfAgents } = this.walkers;
	return JSON.parse(
		JSON.stringify({ size, numberOfAgents, alpha, beta, k, epsilon, s0 })
	);
};

/**
 * Sets the variables of the environment
 */

Controller.prototype.setEnv = function(
	{ size, numberOfAgents, alpha, beta, k, epsilon, s0 },
	restart
) {
	this.env.alpha = +alpha;
	this.env.beta = +beta;
	this.env.k = +k;
	this.env.epsilon = +epsilon;
	this.env.s0 = +s0;
	this.walkers.setPopulation(+numberOfAgents);
	if (restart) {
		this.env.size = size;
		this.engine.restart();
	}
};

/**
 * Gets the variables of the layers
 */
Controller.prototype.getLayers = function() {
	const {
		showWalkers,
		showNodes,
		showCombinedFields,
		showPositiveField,
		showNegativeField,
		positiveColor,
		negativeColor,
		defaultColor,
		combinedColor
	} = this.analysis.displayOptions;

	return {
		showWalkers,
		showNodes,
		showCombinedFields,
		showPositiveField,
		showNegativeField,
		positiveColor,
		negativeColor,
		defaultColor,
		combinedColor
	};
};

/**
 * Sets the variables of the layers
 */
Controller.prototype.setLayers = function(name, value) {
	switch (name) {
		default:
			this.analysis.displayOptions[name] = value;
			return;
	}
};

/**
 * Sets the contrast of the layers
 */
Controller.prototype.setContrast = function(contrast) {
	this.analysis.fineGrain = contrast;
};

/**
 * Sets the variables for the layout
 */
Controller.prototype.setLayout = function(nodes, size, params, key) {
	this.nodes.list = nodes;
	this.nodes.layoutId = key;
	this.env.makeNodesCenter();
	if (this.env.size[0] !== size[0] || this.env.size[1] !== size[1]) {
		this.env.size = size;
		this.engine.restart();
		console.log(this);
	}
};

///////////////////////////////////////////////////////////////
//  STAGE LOOP CONTROLLER		 				          /////
///////////////////////////////////////////////////////////////

/**
 * Sets the id of the frame that is requested for animation
 * @param  {Number} id Identifier of the frame
 */
Controller.prototype.setRequestId = function(id) {
	this.reqId = id;
};

/**
 * Use the loop callback
 */
Controller.prototype.useCallback = function(data) {
	this.loopCallback(data);
};

/**
 * Sets the id of the frame that is requested for animation
 * @param  {Number} id Identifier of the frame
 */
Controller.prototype.setRequestId = function(id) {
	this.reqId = id;
};

/**
 * Sets up the loop in the controller
 * @param  {String} id Identifier of the loop
 * @param  {Function} callback Function that is executed at every frame
 */
Controller.prototype.setupLoop = function(id, callback) {
	this.loopCallback = callback;
	if (this.loop instanceof Loop) return;
	this.loop = new Loop(id, this.useCallback, this.setRequestId);
};

/**
 * Stops the loop
 */
Controller.prototype.stopLoop = function() {
	if (this.loop instanceof Loop) {
		window.cancelAnimationFrame(this.reqId);
		this.reqId = undefined;
	}
};

/**
 * Starts the loop
 */
Controller.prototype.startLoop = function() {
	if (this.loop instanceof Loop && this.reqId === undefined) {
		this.loop.start();
	}
};

///////////////////////////////////////////////////////////////
//  SIMULATION CONTROLLER 			 				      /////
///////////////////////////////////////////////////////////////

/**
 * Starts and stops the simulation engine
 */
Controller.prototype.toggleEngine = function(state) {
	if (state === undefined) {
		this.engine.running = !this.engine.running;
	} else {
		this.engine.running = state;
	}
};

/**
 * Sets the population number
 * @param  {Number} population The first number
 */
Controller.prototype.setPopulation = function(population) {
	this.walkers.setPopulation(population);
};

export default Controller;
