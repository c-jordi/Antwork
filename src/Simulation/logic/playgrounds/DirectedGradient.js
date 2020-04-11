/*
PLAYGROUND: Directed Gradient
Description: This environment is used to see if the walkers follow the gradient 

*/

import generateField from "../utils/generateField";
import generateInitialFields from "../utils/generateInitialFields";

function Environment(direction = [1, 0]) {
	this.size = [30, 30];
	this.direction = direction;

	this.alpha = 1;
	this.epsilon = 0;

	this.hitBox = 1;

	this.allowedSteps = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1]
	];

	this.fields = {
		positive: generateInitialFields(2, this.size, 0),
		negative: generateInitialFields(2, this.size, 0)
	};

	this.gradientFields = {
		positive: generateField(this.size, this.direction),
		negative: generateField(this.size, this.direction)
	};

	this.nodesCenter = {
		positive: [
			Array(this.size[1])
				.fill(0)
				.map((el, i) => [5, i])
		],
		negative: [
			Array(this.size[1])
				.fill(0)
				.map((el, i) => [15, i])
		]
	};

	this.nodeColor = {
		positive: [246, 255, 51],
		negative: [51, 255, 240],
		default: [255, 255, 255]
	};
}

Environment.prototype.assignState = function(state, timeSinceCollision, x, y) {
	this.nodesCenter.positive.forEach(node => {
		const xCoord = node[0] - this.hitBox <= x && node[0] + this.hitBox >= x;
		const yCoord = node[1] - this.hitBox <= y && node[1] + this.hitBox >= y;
		if (xCoord && yCoord) {
			state = 1;
			timeSinceCollision = 0;
		}
	});
	this.nodesCenter.negative.forEach(node => {
		const xCoord = node[0] - this.hitBox <= x && node[0] + this.hitBox >= x;
		const yCoord = node[1] - this.hitBox <= y && node[1] + this.hitBox >= y;
		if (xCoord && yCoord) {
			state = -1;
			timeSinceCollision = 0;
		}
	});
	return [state, timeSinceCollision];
};

Environment.prototype.emit = function(state, timeSinceCollision, x, y) {
	return;
};

Environment.prototype.incrementTime = function() {
	return;
};

Environment.prototype.resetGradientFields = function() {};

Environment.prototype.fieldStep = function(x, y, state) {
	if (state == 0) return [0, 0];
	const field = state == -1 ? "positive" : "negative";

	return this.gradientFields[field][x][y].map(el => el * this.alpha);
};

Environment.prototype.noiseStep = function() {
	const step = Math.floor(Math.random() * 4);
	const eps = Math.sqrt(2 * this.epsilon);
	if (step === 0) {
		return [-eps, 0];
	} else if (step === 1) {
		return [eps, 0];
	} else if (step === 2) {
		return [0, -eps];
	} else {
		return [0, eps];
	}
};

Environment.prototype.discreteStep = function(step) {
	if (step == [0, 0]) return [0, 0];
	const scalarProduct = this.allowedSteps.map(mvt => {
		return mvt[0] * step[0] + mvt[1] * step[1];
	});

	const maxScalarProduct = Math.max(...scalarProduct);

	const maxSteps = scalarProduct
		.map((el, i) => {
			if (el == maxScalarProduct) return i;
			return false;
		})
		.filter(el => el);

	const stepIndex = scalarProduct.indexOf(Math.max(...scalarProduct));

	return this.allowedSteps[stepIndex];
};

Environment.prototype.takeStep = function(x, y, state) {
	const fieldStep = this.fieldStep(x, y, state);
	const noiseStep = this.noiseStep();
	let combinedStep = [0, 0];
	for (let i in combinedStep) {
		combinedStep[i] = fieldStep[i] + noiseStep[i];
	}

	const discreteStep = this.discreteStep(combinedStep);

	[x, y] = [x + discreteStep[0], y + discreteStep[1]];

	// console.log("For a particle of state:", state, " the field is:", fieldStep);
	const new_x = (x + this.size[0]) % this.size[0];
	const new_y = (y + this.size[1]) % this.size[1];
	return [new_x, new_y];
};

export { Environment as DirectedGradient };
