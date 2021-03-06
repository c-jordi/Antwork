function Database(name, callback) {
	this.name = name;
	this.callback = callback || function () {};
}

Database.prototype.push = function (name, value) {
	// adds the value the end of the array of name
	if (this[name] === undefined) {
		this[name] = [];
	}
	this.callback({ name, value });
	this[name].push(value);
};

Database.prototype.save = function (name, value) {
	if (this["_" + name] === undefined) {
		this["_" + name] = {};
	}
	const round = Math.round(value);
	if (round in this["_" + name]) {
		this["_" + name][round]++;
	} else {
		this["_" + name][round] = 1;
	}
};

export default Database;
