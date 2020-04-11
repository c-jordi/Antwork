import Euler from "./Euler";

function Engine(env, walkers, engine = "euler", database, analysis) {
	this.running = false;
	this.env = env;
	this.walkers = walkers;
	this.engine = engine.toLowerCase();
	this.database = database;
	this.analysis = analysis;
	this.setup();
	this.counter = 0;
}

Engine.prototype.restart = function() {
	this.env.clear();
	this.walkers.reset();
	this.analysis.clear();
	this.counter = 0;
};

Engine.prototype.setup = function() {
	switch (this.engine) {
		case "euler":
			this.engine = new Euler(this.env, this.walkers);
			break;
		// case "rk":
		// case "rungekutta":
		// this.engine = RungeKutta;
		default:
			console.log("No engine was selected...");
	}
};

Engine.prototype.next = function() {
	if (!this.running) return;
	this.env.init();
	this.counter++;
	this.engine.run();
	this.saveMetrics();
	this.env.reset();
	this.walkers.resetDr();
};

Engine.prototype.toggle = function() {
	this.running = !this.running;
};

Engine.prototype.stop = function() {
	this.running = false;
};

Engine.prototype.saveMetrics = function() {
	const saveStepSize = walker => {
		const stepSize = Math.sqrt(walker.dr[0][0] ** 2 + walker.dr[0][1] ** 2);
		this.database.save("stepSize", stepSize);
	};
	this.walkers.apply(saveStepSize);
};

export default Engine;
