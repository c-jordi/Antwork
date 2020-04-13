import ratioOfNorms from "../utils/ratioOfNorms";

function Euler(env, walkers) {
	this.env = env;
	this.walkers = walkers;
	this.timeMap = [0];
}

Euler.prototype.run = function () {
	this.computeFieldsDx(0, 0);
	this.computeFieldsDt(0, 0);
	this.computeWalkersDr(0, 0);
	this.computeEulerFields();
	this.computeEulerWalkers();
	this.env.timeSinceStart++;
};

Euler.prototype.computeEulerFields = function () {
	const computeEulerField = (state, x, y) => {
		this.env.fields[state][0][x][y] =
			this.env.fields[state][0][x][y] + this.env.fieldsDt[state][0][x][y];
	};

	this.env.apply(computeEulerField);
};

Euler.prototype.getPosition = function () {};

Euler.prototype.computeEulerWalkers = function () {
	const computeEulerWalker = (walker) => {
		walker.timeSinceCollision += 1;
		walker.x =
			(walker.x + walker.dr[0][0] + this.env.size[0]) % this.env.size[0];
		walker.y =
			(walker.y + walker.dr[0][1] + this.env.size[1]) % this.env.size[1];

		this.env.assignState(walker);
	};
	this.walkers.apply(computeEulerWalker);
};

Euler.prototype.computeWalkersDr = function (inputFrame, outputFrame) {
	const computeWalkerDr = (walker) => {
		const fieldWalkerStep = (state, x, y) => {
			if (state == 0) return [0, 0];
			const fieldState = state == "negative" ? "positive" : "negative";
			const [latx, laty] = this.env.setPosition(x, y);

			return this.env.fieldsDx[fieldState][inputFrame][latx][laty].map(
				(el) => el * this.env.alpha
			);
		};

		const [state, x, y] = [walker.state, walker.x, walker.y];
		const fieldStep = fieldWalkerStep(state, x, y);
		const noiseStep = this.env.noiseStep();

		if (this.env.position == "discrete") {
			const discreteStep = this.env.discreteStep([
				fieldStep[0] + noiseStep[0],
				fieldStep[1] + noiseStep[1],
			]);

			walker.dr[outputFrame] = discreteStep;
		} else {
			walker.dr[outputFrame] = [
				fieldStep[0] + noiseStep[0],
				fieldStep[1] + noiseStep[1],
			];
		}

		const fieldNoiseRatio = ratioOfNorms(fieldStep, noiseStep);
		if (fieldNoiseRatio < 1) {
			walker.pathColor = [255, 255, 255];
		} else if (fieldNoiseRatio > 1 && fieldNoiseRatio < 2) {
			walker.pathColor = [
				255,
				...[255, 255].map((el) => el * (2 - fieldNoiseRatio)),
			];
		} else {
			walker.pathColor = [255, 0, 0];
		}
	};

	this.walkers.apply(computeWalkerDr);
};

Euler.prototype.computeFieldsDt = function (inputFrame, outputFrame) {
	this.addResidues(inputFrame, outputFrame);
	this.addEmissions(inputFrame, outputFrame);
};

Euler.prototype.addResidues = function (inputFrame, outputFrame) {
	const addResidue = (state, x, y) => {
		this.env.fieldsDt[state][outputFrame][x][y] =
			-this.env.k * this.env.fields[state][inputFrame][x][y];
	};

	this.env.apply(addResidue);
};

Euler.prototype.addEmissions = function (inputFrame, outputFrame) {
	const addEmission = (walker) => {
		const [state, x, y, timeSinceCollision] = [
			walker.state,
			walker.x,
			walker.y,
			walker.timeSinceCollision,
		];
		const [latx, laty] = this.env.setPosition(x, y);

		if (state != "positive" && state != "negative") return;

		const newTime = timeSinceCollision + this.timeMap[inputFrame];
		this.env.fieldsDt[state][outputFrame][latx][laty] += this.env.getEmission(
			newTime * 2
		);
	};
	this.walkers.apply(addEmission);
};

Euler.prototype.computeFieldsDx = function (inputFrame, outputFrame) {
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

export default Euler;
