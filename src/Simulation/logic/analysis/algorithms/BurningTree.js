import { copy } from "../../utils/tools";
import generateField from "../../utils/generateField";

function BurningTree(matrix, campfires) {
	// matrix: Binary map of the trees
	// campfires: Location where the first is started
	this.rows = matrix.length;
	this.cols = matrix[0].length;
	this.forest = matrix;
	this.campfires = campfires;
	this.maxPathLength = 50;
	this.A = null;
	this.edges = [];

	return this.connect();
}

BurningTree.prototype.connect = function() {
	this.A = this.campfires.map(campfire => this.burnForest(campfire));
	return this.A;
};

BurningTree.prototype.burnForest = function(campfire) {
	// Returns adjacency matrix
	const { name, state, coord } = campfire;
	let forest = copy(this.forest);

	let stack = [[...coord, -1]];

	while (stack.length && stack[0][2] < this.maxPathLength) {
		this.explore(forest, stack);
	}

	return this.campfires.map(camp => {
		const [xtar, ytar] = camp.coord;
		const filtered = this.getNeighbors(xtar, ytar, 1).filter(([x, y]) => {
			return forest[x][y] > 1 && camp.name != campfire.name;
		});

		return filtered.length ? 1 : 0;
	});
};

BurningTree.prototype.explore = function(forest, stack) {
	const [x, y, step] = stack.shift();

	if (forest[x][y] == 0) {
		if (step !== -1) {
			return;
		}
	}

	forest[x][y] = step;

	if (this.checkCampfire([x, y])) {
		if (step !== -1 && step !== 2) {
			return;
		}
	}

	if (step == -1) {
		const neighbors = this.getNeighbors(x, y, 1);
		neighbors.forEach(neighbor => {
			const [x, y] = neighbor;
			if (forest[x][y] == 1) {
				stack.push([x, y, 2]);
			}
		});
	} else {
		const neighbors = this.getNeighbors(x, y);
		neighbors.forEach(neighbor => {
			const [x, y] = neighbor;
			if (forest[x][y] == 1) {
				stack.push([x, y, step + 1]);
			}
		});
	}
};

BurningTree.prototype.checkCampfire = function(coord) {
	return this.campfires.filter(campfire => {
		this.getNeighbors(campfire.coord, 1).filter(neighbor => {
			return neighbor[0] == coord[0] && neighbor[1] == coord[1];
		});
		const condition =
			campfire.coord[0] - 1 <= coord[0] &&
			coord[0] <= campfire.coord[0] + 1 &&
			campfire.coord[1] - 1 <= coord[1] &&
			campfire.coord[1] + 1 >= coord[1];
		return condition;
	}).length;
};

BurningTree.prototype.getNeighbors = function(x, y, diag = 0) {
	// diag : 1 , returns diag

	const up = (y - 1 + this.cols) % this.cols;
	const left = (x - 1 + this.rows) % this.rows;
	const right = (x + 1 + this.rows) % this.rows;
	const down = (y + 1 + this.cols) % this.cols;

	const diags = [
		[left, up],
		[left, down],
		[right, up],
		[right, down]
	];

	if (diag) return [[x, down], [x, up], [left, y], [right, y], ...diags];
	return [
		[x, down],
		[x, up],
		[left, y],
		[right, y]
	];
};

export default BurningTree;
