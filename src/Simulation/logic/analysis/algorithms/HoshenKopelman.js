import { copy } from "../../utils/tools";
import generateField from "../../utils/generateField";

function HoshenKopelman(matrix) {
	const rows = matrix.length;
	const cols = matrix[0].length;
	let labels = generateField([rows, cols], null);
	let mapping = {};

	const left = index => index - 1;
	const right = index => index + 1;
	const up = index => index - 1;
	const down = index => index + 1;

	let largestLabel = 0;
	for (let j = 0; j < cols; j++) {
		for (let i = 0; i < rows; i++) {
			if (matrix[i][j] == 1) {
				if (left(i) >= 0 && up(j) >= 0) {
					if (matrix[left(i)][j] == 0 && matrix[i][up(j)] == 0) {
						largestLabel += 1;
						labels[i][j] = largestLabel;
					} else if (matrix[left(i)][j] == 1 && matrix[i][up(j)] == 0) {
						labels[i][j] = labels[left(i)][j];
					} else if (matrix[left(i)][j] == 0 && matrix[i][up(j)] == 1) {
						labels[i][j] = labels[i][up(j)];
					} else if (matrix[left(i)][j] == 1 && matrix[i][up(j)] == 1) {
						labels[i][j] = labels[left(i)][j];
						if (labels[left(i)][j] !== labels[i][up(j)]) {
							mapping[labels[i][up(j)]] = labels[left(i)][j];
						}
					}
				} else if (left(i) >= 0 && matrix[left(i)][j] == 1) {
					labels[i][j] = labels[left(i)][j];
				} else if (up(j) >= 0 && matrix[i][up(j)] == 1) {
					labels[i][j] = labels[i][up(j)];
				} else {
					largestLabel += 1;
					labels[i][j] = largestLabel;
				}
				// if (j == cols - 1 && matrix[i][0] == 1) {
				// 	mapping[labels[i][j]] = labels[i][0];
				// }
				// if (i == rows - 1 && matrix[0][j] == 1) {
				// 	mapping[labels[i][j]] = labels[0][j];
				// }
			}
		}
	}

	let reducedMapping = reduceMapping(mapping);
	let reducedLabels = generateField([rows, cols], 0);
	for (let i in labels) {
		for (let j in labels[i]) {
			if (labels[i][j] !== null) {
				reducedLabels[i][j] = reducedMapping[labels[i][j].toString()];
			}
		}
	}

	return reducedLabels;
}

export default HoshenKopelman;

function reduceMapping(mapping) {
	let mappingCopy = copy(mapping);
	Object.keys(mapping).forEach(key => {
		if (key == mapping[mapping[key].toString()]) {
			delete mappingCopy[key];
		}
	});

	Object.keys(mappingCopy).forEach(key => {
		let keysToChange = [];
		let value = mappingCopy[key].toString();
		while (value in mappingCopy) {
			keysToChange.push(value);
			value = mappingCopy[value].toString();
		}
		mappingCopy[key] = +value;
		keysToChange.forEach(el => {
			mappingCopy[el] = +value;
		});
	});
	return mappingCopy;
}
