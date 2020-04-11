function Nodes() {
	this.list = [];
	this.addRandom = this.addRandom.bind(this);
}

Nodes.prototype.default = function() {
	this.layoutId = "Switch";
	this.add("node_1", 1, [15, 7]);
	this.add("node_2", -1, [15, 22]);
};

Nodes.prototype.add = function(name, state, [x, y]) {
	this.list.push({
		name,
		state,
		coord: [x, y]
	});
};

Nodes.prototype.remove = function(name) {
	if (name === undefined) return;
	this.list = this.list.filter(node => node.name !== name);
};

Nodes.prototype.assign = function(name, props) {
	if (name === undefined) return;
	this.list = this.list.map(node => ({
		...node,
		...(node.name === name ? props : {})
	}));
};

Nodes.prototype.addRandom = function(maxX, maxY) {
	this.add(`Node_${this.list.length}`, Math.random() * 2 > 1 ? 1 : -1, [
		Math.floor(Math.random() * maxX),
		Math.floor(Math.random() * maxY)
	]);
};

export default Nodes;
