import generateField from "../utils/generateField";
import HoshenKopelman from "./algorithms/HoshenKopelman";
import BurningTree from "./algorithms/BurningTree";

function Connectivity(env, database) {
	this.env = env;
	this.connectivityThreshold = env.s0 * 2;
	this.database = database;
	this.adjencyMatrix = null;
	this.hoshenKopelman = null;
	this.reset();
}

// Connectivity.prototype.createNodes = function() {
// 	this.nodes = [
// 		...this.nodesCenter.positive.map((el, i) => ({
// 			name: `Node ${i}`,
// 			state: "positive",
// 			position: el
// 		})),
// 		...this.nodesCenter.negative.map((el, i) => ({
// 			name: `Node ${this.nodesCenter.positive.length + i}`,
// 			state: "negative",
// 			position: el
// 		}))
// 	];
// };

Connectivity.prototype.filterUsingThreshold = function(combinedField) {
	for (let i = 0; i < this.env.size[0]; i++) {
		for (let j = 0; j < this.env.size[1]; j++) {
			this.filteredField[i][j] =
				combinedField[i][j] > this.connectivityThreshold ? 1 : 0;
		}
	}
};

Connectivity.prototype.reset = function() {
	this.filteredField = generateField(this.env.size, 0);
};

Connectivity.prototype.run = function(combinedField, { time }) {
	this.reset();
	this.filterUsingThreshold(combinedField);
	// this.hoshenKopelman = HoshenKopelman(this.filteredField);
	const burningTree = new BurningTree(this.filteredField, this.env.nodes.list);
	const nbrEdges = burningTree
		.map(row => row.reduce((a, b) => a + b, 0))
		.reduce((a, b) => a + b, 0);

	this.database.push("connectivity", { time, A: burningTree, E: nbrEdges / 2 });
	return { time, y: nbrEdges / 2 };
};

export default Connectivity;
