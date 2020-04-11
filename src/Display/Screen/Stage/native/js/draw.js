function DrawFunc(controller, width, height) {
	this.controller = controller;
	this.isSetup = false;
	this.uiCtx = null;
	this.gameCtx = null;
	this.backCtx = null;
	this.scale = null;
	this.offsetX = null;
	this.offsetY = null;
	this.width = width;
	this.height = height;
	this.versions = {
		ui: -1,
		game: -1,
		back: -1
	};
	this.draw = this.draw.bind(this);
}

/////
// ATOMIC FUNCTIONS
/////

DrawFunc.prototype.setup = function({ game, ui, back }) {
	if (this.isSetup) return;
	this.uiCtx = ui.getContext("2d");
	this.gameCtx = game.getContext("2d");
	this.backCtx = back.getContext("2d");
	this.uiCtx.canvas.width = this.width;
	this.uiCtx.canvas.height = this.height;
	this.gameCtx.canvas.width = this.width;
	this.gameCtx.canvas.height = this.height;
	this.backCtx.canvas.width = this.width;
	this.backCtx.canvas.height = this.height;
	this.isSetup = true;
	this.adjustScale();
	this.drawNodes();
};

DrawFunc.prototype.adjustScale = function() {
	const [x, y] = this.controller.env.size;
	const scalex = this.width / x;
	const scaley = this.height / y;
	this.scale = scalex < scaley ? scalex : scaley;
	this.offsetX = Math.floor((this.width - x * this.scale) / 2);
	this.offsetY = Math.floor((this.height - y * this.scale) / 2);
};

DrawFunc.prototype.fill = function(ctx, color) {
	ctx.strokeColor = color;
	ctx.fillStyle = color;
	ctx.fillRect(
		this.offsetX,
		this.offsetY,
		this.width * this.scale,
		this.height * this.scale
	);
};

DrawFunc.prototype.point = function(ctx, color, coord) {
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
	ctx.fillRect(
		Math.round(coord[0] * this.scale) + this.offsetX,
		Math.round(coord[1] * this.scale) + this.offsetY,
		Math.round(this.scale),
		Math.round(this.scale)
	);
};

////
// COMPONENT FUNCTIONS
////

DrawFunc.prototype.drawWalkers = function() {
	const drawWalker = walker => {
		const [latx, laty] = this.controller.env.setPosition(walker.x, walker.y);
		this.point(
			this.gameCtx,
			this.controller.analysis.displayOptions.defaultColor,
			[latx, laty]
		);
	};
	this.controller.walkers.apply(drawWalker);
};

DrawFunc.prototype.drawNodes = function() {
	// if (this.controller.updates.back === this.versions.back) return;
	// this.versions.back = this.controller.updates.back;
	const { positive, negative } = this.controller.env.nodesCenter;
	const [x, y] = this.controller.env.size;
	positive
		.filter(coord => coord[0] <= x + 1 && coord[1] <= y + 1)
		.forEach(coord => {
			this.point(
				this.uiCtx,
				this.controller.analysis.displayOptions.positiveColor,
				coord
			);
		});
	negative
		.filter(coord => coord[0] <= x + 1 && coord[1] <= y + 1)
		.forEach(coord => {
			this.point(
				this.uiCtx,
				this.controller.analysis.displayOptions.negativeColor,
				coord
			);
		});
	this.controller.updates.back = false;
};

DrawFunc.prototype.drawCombinedFields = function() {
	for (let x = 0; x < this.controller.analysis.combinedField.length; x++) {
		for (let y = 0; y < this.controller.analysis.combinedField[x].length; y++) {
			const fieldStrength = this.controller.analysis.combinedField[x][y];
			const fieldColor = `rgba(${hexToRGB(
				this.controller.analysis.displayOptions.combinedColor
			)},${transform(
				fieldStrength,
				this.controller.analysis.maxima,
				this.controller.analysis.fineGrain
			)})`;
			this.point(this.gameCtx, fieldColor, [x, y]);
		}
	}
};

DrawFunc.prototype.drawPositiveField = function() {
	for (let x = 0; x < this.controller.env.fields.positive[0].length; x++) {
		for (let y = 0; y < this.controller.env.fields.positive[0][x].length; y++) {
			const fieldStrength = this.controller.env.fields.positive[0][x][y];
			const fieldColor = `rgba(${hexToRGB(
				this.controller.analysis.displayOptions.positiveColor
			)},${transform(
				fieldStrength,
				this.controller.analysis.maxima,
				this.controller.analysis.fineGrain
			)})`;
			this.point(this.gameCtx, fieldColor, [x, y]);
		}
	}
};

DrawFunc.prototype.drawNegativeField = function() {
	for (let x = 0; x < this.controller.env.fields.negative[0].length; x++) {
		for (let y = 0; y < this.controller.env.fields.negative[0][x].length; y++) {
			const fieldStrength = this.controller.env.fields.negative[0][x][y];
			const fieldColor = `rgba(${hexToRGB(
				this.controller.analysis.displayOptions.negativeColor
			)},${transform(
				fieldStrength,
				this.controller.analysis.maxima,
				this.controller.analysis.fineGrain
			)})`;
			this.point(this.gameCtx, fieldColor, [x, y]);
		}
	}
};

////
// HIGHLEVEL FUNCTIONS
////

/**  Draws the stage according to the display object
 * @param  {Object} dO displayOptions
 */
DrawFunc.prototype.draw = function(dO) {
	if (dO.showNodes) this.drawNodes();
	if (dO.showCombinedFields) this.drawCombinedFields();
	if (dO.showPositiveField) this.drawPositiveField();
	if (dO.showNegativeField) this.drawNegativeField();
	if (dO.showWalkers) this.drawWalkers();
};

export default DrawFunc;

function transform(x, { max, min }, fineGrain) {
	const tr = Math.log10(1 + (9 * fineGrain * (x - min)) / (max - min));
	if (tr < 1e-2) return 0;
	if (tr > 1) return 1;
	return tr;
}

function hexToRGB(h) {
	let r = 0,
		g = 0,
		b = 0;

	if (h.length == 4) {
		r = "0x" + h[1] + h[1];
		g = "0x" + h[2] + h[2];
		b = "0x" + h[3] + h[3];
	} else if (h.length == 7) {
		r = "0x" + h[1] + h[2];
		g = "0x" + h[3] + h[4];
		b = "0x" + h[5] + h[6];
	}

	return "" + +r + "," + +g + "," + +b + "";
}
