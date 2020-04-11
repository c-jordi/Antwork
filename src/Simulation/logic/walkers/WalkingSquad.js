import Walker from "./Walker";

function WalkingSquad(numberOfAgents, environment, x, y, state) {
	this.numberOfAgents = numberOfAgents;
	this.state = state;
	this.env = environment;
	this.x = x;
	this.y = y;
	this.squad = [];
	this.createSquad();
}

WalkingSquad.prototype.createSquad = function() {
	for (let i = 0; i < this.numberOfAgents; i++) {
		this.squad.push(this.createWalker(`Walker_${i}`));
	}
};

WalkingSquad.prototype.createWalker = function(name) {
	const [newX, newY] = this.env.setStartingPosition(this.x, this.y);
	const newState = this.env.setStartingState(this.state);

	return new Walker(name, newX, newY, newState);
};

WalkingSquad.prototype.removeWalker = function(count = 1) {
	if (count === 0) return;
	if (this.squad.length) {
		const number = this.squad.length < count ? this.squad.length : count;
		this.squad = this.squad.slice(0, -number);
	}
	this.numberOfAgents = this.squad.length;
};

WalkingSquad.prototype.addWalker = function(count = 1) {
	for (let i = 0; i < count; i++) {
		this.squad.push(this.createWalker(`Walker_${this.squad.length + i}`));
	}
	this.numberOfAgents = this.squad.length;
};

WalkingSquad.prototype.setPopulation = function(population) {
	if (!Number.isInteger(population)) return;
	const popDiff = population - this.numberOfAgents;
	popDiff > 0 ? this.addWalker(popDiff) : this.removeWalker(-popDiff);
};

WalkingSquad.prototype.resetPath = function() {
	for (let i = 0; i < this.numberOfAgents; i++) {
		this.squad[i].xpath = [this.squad[i].x, ...Array(4).fill(0)];
		this.squad[i].ypath = [this.squad[i].y, ...Array(4).fill(0)];
	}
};

WalkingSquad.prototype.apply = function(func) {
	// Applies on each walker
	for (let i = 0; i < this.numberOfAgents; i++) {
		func(this.squad[i]);
	}
};

WalkingSquad.prototype.resetDr = function() {
	for (let i = 0; i < this.numberOfAgents; i++) {
		this.squad[i].dr = Array(4).fill(null);
	}
};
WalkingSquad.prototype.reset = function() {
	this.squad = [];
	this.createSquad();
};

export default WalkingSquad;
