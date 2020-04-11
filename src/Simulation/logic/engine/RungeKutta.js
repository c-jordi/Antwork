function RungeKutta(env, walkers) {
	this.env = env;
	this.walkers = walkers;
	this.timeMap = [0, 0.5, 0.5, 1];
}

RungeKutta.prototype.run = function() {
	/*   | : computed    * : need to compute    - : empty
    H Fields:  [ | , - , - , - , - ]
    WalkersR:  [ | , - , - , - , - ]
    WalkersDr: [ | , - , - , - , - ]
    FieldsDt:  [ * , - , - , - , - ]
    FieldsDx:  [ * , - , - , - , - ]
    */

	this.computeFieldsDt(0, 0);
	this.computeFieldsDx(0, 0);

	/*   | : computed    * : need to compute    - : empty
    H Fields:  [ | , * , - , - , - ]
    WalkersDr: [ | , * , - , - , - ]
    FieldsDt:  [ | , - , - , - , - ]
    FieldsDx:  [ | , - , - , - , - ]
    */

	this.computeFields(0, 1);
	this.computeWalkersUpdate(0, 1);
};

RungeKutta.prototype.computeFields = function(inputFrame, outputFrame) {
	const computePointField = (state, x, y) => {
		this.fields[state][outputFrame][x][y] =
			this.fields[state][inputFrame][x][y] +
			this.fieldsDt[state][inputFrame][x][y];
	};

	this.env.apply(computePointField);
};

RungeKutta.prototype.computeWalkersUpdate = function(inputFrame, outputFrame) {
	const fieldStep = (state, x, y) => {
		if (state == 0) return [0, 0];
		const fieldState = state == "negative" ? "positive" : "negative";

		return this.env.fieldsDx[fieldState][inputFrame][x][y].map(
			el => el * this.alpha
		);
	};

	const walkerStep = walker => {
		const [state, x, y] = walker.history[inputFrame];
		const fieldStep = fieldStep(state, x, y);
		const noiseStep = this.env.noiseStep();
	};
};

RungeKutta.prototype.computeFieldDt = function(inputFrame, outputFrame) {
	this.addResidues(inputFrame, outputFrame);
	this.addEmissions(inputFrame, outputFrame);
};

RungeKutta.prototype.addResidues = function(inputFrame, outputFrame) {
	const addResidue = (x, y) => {
		this.fieldsDt[state][outputFrame][x][y] =
			-this.env.k * this.fields[state][inputFrame][x][y];
	};

	this.env.apply(addResidue);
};

RungeKutta.prototype.addEmissions = function(inputFrame, outputFrame) {
	const addEmission = walker => {
		const [state, x, y, timeSinceCollision] = walker.history[inputFrame];
		const [latx, laty] = this.env.setPosition(x, y);

		if (state != "positive" && state != "negative") return;

		const newTime = timeSinceCollision + this.timeMap[inputFrame];
		this.fieldsDt[state][outputFrame][latx][laty] += this.env.getDecay(
			newTime * 2
		);
	};
	this.walkers.apply(addEmission);
};

RungeKutta.prototype.computeFieldsDx = function(inputFrame, outputFrame) {
	const computePointDx = (state, x, y) => {
		const x_minus = (x - 1 + this.env.size[0]) % this.env.size[0];
		const x_plus = (x + 1 + this.env.size[0]) % this.env.size[0];
		if (!this.env.fields[state][inputFrame][x_plus][y]) {
			this.env.fields[state][inputFrame][x_plus][y] = 0;
		}
		if (!this.env.fields[state][inputFrame][x_minus][y]) {
			this.env.fields[state][inputFrame][x_minus][y] = 0;
		}
		this.env.fieldsDx[state][outputFrame][x][y][0] =
			(this.env.fields[state][inputFrame][x_plus][y] -
				this.env.fields[state][inputFrame][x_minus][y]) /
			2;

		// Y derivative
		const y_minus = (y - 1 + this.env.size[1]) % this.env.size[1];
		const y_plus = (y + 1 + this.env.size[1]) % this.env.size[1];
		if (!this.env.fields[state][inputFrame][x][y_plus]) {
			this.env.fields[state][inputFrame][x][y_plus] = 0;
		}
		if (!this.env.fields[state][inputFrame][x][y_minus]) {
			this.env.fields[state][inputFrame][x][y_minus] = 0;
		}
		this.env.fieldsDx[state][outputFrame][x][y][1] =
			(this.env.fields[state][inputFrame][x][y_plus] -
				this.env.fields[state][inputFrame][x][y_minus]) /
			2;
	};

	this.env.apply(computePointDx);
};
