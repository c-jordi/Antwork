import generateField from "../utils/generateField";
import generateInitialFields from "../utils/generateInitialFields";
import displayArray from "../utils/displayArray";
import "../utils/prototypes";
import { copy } from "../utils/tools";

function Environment({
	alpha = 1,
	beta = 0.2,
	k = 0.01,
	nodes = {
		list: [
			{ name: "node_1", state: 1, coord: [15, 1] },
			{ name: "node_2", state: -1, coord: [29, 1] }
		]
	},
	layout: { size = [30, 30], lattice = "square", position = "discrete" },
	epsilon = 0.5,
	s0 = 25000
}) {
	this.size = size;
	this.alpha = alpha;
	this.beta = beta;
	this.k = k;
	this.epsilon = epsilon;
	this.s0 = s0;
	this.framerate = 30;
	this.position = position;
	this.hitBox = 1;

	this.freeze = false;

	this.lattice = lattice;

	this.timeSinceStart = 0;

	this.fields = {
		positive: generateInitialFields(5, this.size, 0),
		negative: generateInitialFields(5, this.size, 0)
	};

	this.fieldsDt = {
		positive: generateInitialFields(5, this.size, 0),
		negative: generateInitialFields(5, this.size, 0)
	};

	this.fieldsDx = {
		positive: generateInitialFields(5, this.size, [0, 0]),
		negative: generateInitialFields(5, this.size, [0, 0])
	};

	this.nodes = nodes;

	this.nodesCenter = undefined;

	this.nodeColor = {
		positive: [246, 255, 51],
		negative: [51, 255, 240],
		default: [255, 255, 255]
	};

	this.allowedSteps = [
		[-1, 0],
		[0, 1],
		[1, 0],
		[0, -1]
	];

	this.init();
}

Environment.prototype.getEmission = function(t) {
	return this.s0 * Math.exp((-this.beta * t * 2) / 2);
};

Environment.prototype.setStartingState = function(state) {
	if (state == "rand") {
		state = Math.floor(Math.random() * 2) ? "positive" : "negative";
	}
	return state;
};

Environment.prototype.apply = function(func) {
	// Loops over state,x,y
	["positive", "negative"].forEach(state => {
		for (let x = 0; x < this.size[0]; x++) {
			for (let y = 0; y < this.size[1]; y++) {
				func(state, x, y);
			}
		}
	});
};

Environment.prototype.setStartingPosition = function(x, y) {
	if (x == "rand") {
		x = Math.random() * this.size[0];
	}
	if (y == "rand") {
		y = Math.random() * this.size[1];
	}
	if (this.position == "continuous") {
		return [x, y];
	}
	return this.setPosition(x, y);
};

Environment.prototype.setPosition = function(x, y) {
	if (this.lattice == "square") {
		return [Math.floor(x), Math.floor(y)];
	}
	if (this.lattice.includes("trian")) {
		if (x % 2) {
			y = 4 * Math.floor(y / 4) + 2;
		} else {
			y = 4 * Math.floor(y / 4);
		}
		return [x, y];
	}
};

Environment.prototype.assignState = function(walker) {
	const [latx, laty] = this.setPosition(walker.x, walker.y);
	this.nodesCenter.positive.forEach(node => {
		if (
			node[0] - this.hitBox <= latx &&
			node[0] + this.hitBox >= latx &&
			node[1] - this.hitBox <= laty &&
			node[1] + this.hitBox >= laty
		) {
			walker.state = "positive";
			walker.timeSinceCollision = 0;
		}
	});
	this.nodesCenter.negative.forEach(node => {
		if (
			node[0] - this.hitBox <= latx &&
			node[0] + this.hitBox >= latx &&
			node[1] - this.hitBox <= laty &&
			node[1] + this.hitBox >= laty
		) {
			walker.state = "negative";
			walker.timeSinceCollision = 0;
		}
	});
};

Environment.prototype.makeNodesCenter = function() {
	this.nodesCenter = {
		positive: this.nodes.list
			.filter(node => node.state === 1)
			.map(node => node.coord),
		negative: this.nodes.list
			.filter(node => node.state === -1)
			.map(node => node.coord)
	};
};

Environment.prototype.init = function() {
	this.makeNodesCenter();
};

Environment.prototype.reset = function() {
	this.resetFields();
	this.resetFieldsDt();
	this.resetFieldsDx();
};

Environment.prototype.clearFields = function() {
	this.fields = {
		positive: generateInitialFields(5, this.size, 0),
		negative: generateInitialFields(5, this.size, 0)
	};
};

Environment.prototype.resetFields = function() {
	this.fields = {
		positive: [
			this.fields.positive[0],
			...generateInitialFields(4, this.size, 0)
		],
		negative: [
			this.fields.negative[0],
			...generateInitialFields(4, this.size, 0)
		]
	};
};

Environment.prototype.resetFieldsDx = function() {
	this.fieldsDx = {
		positive: generateInitialFields(5, this.size, [0, 0]),
		negative: generateInitialFields(5, this.size, [0, 0])
	};
};

Environment.prototype.resetFieldsDt = function() {
	this.fieldsDt = {
		positive: generateInitialFields(5, this.size, 0),
		negative: generateInitialFields(5, this.size, 0)
	};
};

Environment.prototype.noiseStep = function() {
	const angle = Math.random() * 2 * Math.PI;
	const eps = Math.sqrt(2 * this.epsilon);
	return [eps * Math.cos(angle), eps * Math.sin(angle)];
};

Environment.prototype.discreteStep = function(step) {
	if (step == [0, 0]) return [0, 0];
	const scalarProduct = this.allowedSteps.map(mvt => {
		return mvt[0] * step[0] + mvt[1] * step[1];
	});

	const maxScalarProduct = Math.max(...scalarProduct);
	const stepIndex = scalarProduct.indexOfRand(maxScalarProduct);

	return this.allowedSteps[stepIndex];
};

Environment.prototype.clear = function() {
	this.clearFields();
	this.resetFieldsDt();
	this.resetFieldsDx();
	this.makeNodesCenter();
	this.timeSinceStart = 0;
};

export default Environment;
