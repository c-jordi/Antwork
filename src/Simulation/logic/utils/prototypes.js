Array.prototype.indexOfRand = function(value) {
	let indexArray = [];
	let array = this;
	while (array.indexOf(value) > -1) {
		indexArray.push(array.indexOf(value));
		array[array.indexOf(value)] = null;
	}
	if (indexArray.length)
		return indexArray[Math.floor(Math.random() * indexArray.length)];
	return -1;
};
