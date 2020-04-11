const margin = {
	top: 100,
	left: 100,
	bottom: 100,
	right: 50
};

const offset = {
	x: 20,
	y: 20
};

const axisStep = {
	x: 500,
	y: 10
};

const tickStep = {
	x: 100,
	y: 1
};

const tickTextSize = "30";

const maxNumberOfTicks = 10;

const tickLength = 8;

const pointSize = 6;

const cursorResolutionDistance = 20;

function Plot(canvas) {
	this.name = "connectivity plot";
	this.canvas = canvas;
	this.width = canvas.width;
	this.height = canvas.height;
	this.ctx = canvas.getContext("2d");
	this.data = [];
	this.origin = [margin.left, this.height - margin.bottom];
	this.YAxisEnd = [margin.left, margin.top];
	this.XAxisEnd = [this.width - margin.right, this.height - margin.bottom];
	this.xScale = null;
	this.yScale = null;
	this.xMousePosition = null;
	this.yMousePosition = null;
	this.cursorTime = null;

	this.clear();
	this.setAxis();

	this.setMousePosition = this.setMousePosition.bind(this);
}

Plot.prototype.clear = function() {
	this.ctx.clearRect(0, 0, this.width, this.height);
};

Plot.prototype.setAxis = function() {
	this.setXAxis();
	this.setYAxis();
};

Plot.prototype.setYAxis = function() {
	const yAxisPoints = [this.origin, this.YAxisEnd];
	this.useAxisLineStyle();
	this.makeLineThroughPoints(yAxisPoints);
};

Plot.prototype.setXAxis = function() {
	const xAxisPoints = [this.origin, this.XAxisEnd];
	this.useAxisLineStyle();
	this.makeLineThroughPoints(xAxisPoints);
};

Plot.prototype.makeLineThroughPoints = function(points) {
	this.ctx.beginPath();
	this.ctx.moveTo(points[0][0], points[0][1]);
	points.slice(1).forEach(coord => this.ctx.lineTo(coord[0], coord[1]));
	this.ctx.stroke();
	this.ctx.closePath();
};

Plot.prototype.useAxisLineStyle = function() {
	this.ctx.lineWidth = 2;
	this.ctx.strokeStyle = "white";
};

Plot.prototype.draw = function(data) {
	if (data !== undefined) {
		this.data = data;
	}
	this.setScale();
	this.addAxisTicks();
	this.addPoints();
};

Plot.prototype.setScale = function() {
	this.getMaxValues();
	this.roundMaxValues();
	this.determineScale();
};

Plot.prototype.getMaxValues = function() {
	this.maxX = this.getMaxValueForProperty("time");
	this.maxY = this.getMaxValueForProperty("E");
};

Plot.prototype.getMaxValueForProperty = function(property) {
	let max = null;
	this.data.forEach(point => {
		if (max == null) {
			max = point[property];
		} else if (point[property] > max) {
			max = point[property];
		}
	});
	return max ? max : 0;
};

Plot.prototype.roundMaxValues = function() {
	this.roundedWidth = (Math.floor(this.maxX / axisStep.x) + 1) * axisStep.x;
	this.roundedHeight = (Math.floor(this.maxY / axisStep.y) + 1) * axisStep.y;
};

Plot.prototype.determineScale = function() {
	this.xScale = this.getXScale();
	this.yScale = this.getYScale();
};

Plot.prototype.getXScale = function() {
	const adjustedWidth = this.width - margin.left - margin.right - offset.x;
	return adjustedWidth / this.roundedWidth;
};

Plot.prototype.getYScale = function() {
	const adjustedHeight = this.height - margin.top - margin.bottom - offset.y;
	return adjustedHeight / this.roundedHeight;
};

Plot.prototype.addAxisTicks = function() {
	this.addXTicks();
	this.addYTicks();
};

Plot.prototype.y = function(y) {
	return Math.round(this.height - margin.bottom - offset.y - y * this.yScale);
};

Plot.prototype.yinv = function(yPixel) {
	return Math.round(
		(this.height - margin.bottom - offset.y - yPixel) / this.yScale
	);
};

Plot.prototype.x = function(x) {
	return Math.round(margin.left + offset.x + x * this.xScale);
};

Plot.prototype.xinv = function(xPixel) {
	return Math.round((xPixel - margin.left - offset.x) / this.xScale);
};

Plot.prototype.addXTicks = function() {
	const numberOfTicks = Math.ceil(this.roundedWidth / tickStep.x);
	for (let i = 0; i < numberOfTicks; i += 1 + Math.floor(numberOfTicks / 10)) {
		const value = i * tickStep.x;
		const x = this.x(value);
		const y = this.height - margin.bottom;
		this.drawVerticalTick([x, y]);
		const xTick = x;
		const yTick = y + Math.floor(tickTextSize * 1.5);
		this.writeTickText([xTick, yTick], value.toString());
	}
};

Plot.prototype.addYTicks = function() {
	const numberOfTicks = Math.ceil(this.roundedHeight / tickStep.y);
	for (let j = 0; j < numberOfTicks; j += 1 + Math.floor(numberOfTicks / 10)) {
		const value = j * tickStep.y;
		const x = margin.left;
		const y = this.y(value);
		this.drawHorizontalTick([x, y]);
		const xTick = x - tickTextSize * 2;
		const yTick = y + Math.round(+tickTextSize / 2);
		this.writeTickText([xTick, yTick], value.toString());
	}
};

Plot.prototype.drawVerticalTick = function(coord) {
	this.useTickLineStyle();
	const tickEndPoint = [coord[0], coord[1] + tickLength];
	const linePoints = [coord, tickEndPoint];
	this.makeLineThroughPoints(linePoints);
};

Plot.prototype.writeTickText = function(coord, text) {
	this.useTickTextStyle();
	this.ctx.fillText(text, coord[0], coord[1]);
};
Plot.prototype.useTickTextStyle = function() {
	this.ctx.font = tickTextSize + "px monospace";
	this.ctx.fillStyle = "white";
};

Plot.prototype.drawHorizontalTick = function(coord) {
	this.useTickLineStyle();
	const tickEndPoint = [coord[0] - tickLength, coord[1]];
	const linePoints = [coord, tickEndPoint];
	this.makeLineThroughPoints(linePoints);
};

Plot.prototype.useTickLineStyle = function() {
	this.ctx.lineWidth = 1;
	this.ctx.strokeStyle = "white";
};

Plot.prototype.addPoints = function() {
	this.usePointStyle();
	this.drawPoints();
};

Plot.prototype.usePointStyle = function() {
	this.ctx.fillStyle = "rgb(99, 186, 255)";
};

Plot.prototype.drawPoints = function() {
	this.data.forEach(el => {
		const x = this.x(el.time);
		const y = this.y(el.E);
		this.drawCircle([x, y]);
	});
};

Plot.prototype.drawCircle = function(coord) {
	this.ctx.beginPath();
	this.ctx.arc(...coord, pointSize, 0, 2 * Math.PI);
	this.ctx.fill();
	this.ctx.closePath();
};

Plot.prototype.setMousePosition = function({ layerX, layerY }) {
	this.xMousePosition = Math.round(
		(layerX * this.width) / this.canvas.offsetWidth
	);
	this.yMousePosition = Math.round(
		(layerY * this.height) / this.canvas.offsetHeight
	);
	this.processMouse();
};

Plot.prototype.processMouse = function() {
	this.clearCursor();
	if (this.isMouseInChart()) {
		this.checkMouseNeighborhood();
		this.setCursor();
	}
};

Plot.prototype.clearCursor = function() {
	this.clear();
	this.setAxis();
	this.draw();
};

Plot.prototype.isMouseInChart = function() {
	const xCondition =
		margin.left <= this.xMousePosition &&
		this.xMousePosition <= this.width - margin.right;
	const yCondition =
		margin.top <= this.yMousePosition &&
		this.yMousePosition <= this.height - margin.bottom;

	return xCondition && yCondition;
};

Plot.prototype.checkMouseNeighborhood = function() {
	let distance = cursorResolutionDistance;
	let neighborTime = null;
	this.data
		.map(point => point.time)
		.forEach(time => {
			const delay = Math.abs(this.x(time) - this.xMousePosition);
			if (delay < distance) {
				distance = delay;
				neighborTime = time;
			}
		});

	this.minMouseToPointDistance = distance;
	this.mouseNeighborTime = neighborTime ? neighborTime : null;
};

Plot.prototype.setCursor = function() {
	if (this.isMouseNearPoint()) {
		this.drawCursor();
	}
};

Plot.prototype.isMouseNearPoint = function() {
	return this.minMouseToPointDistance < cursorResolutionDistance ? true : false;
};

Plot.prototype.drawCursor = function() {
	this.useCursorStyle();
	const xCursor = this.x(this.mouseNeighborTime);
	const cursorStart = [xCursor, this.y(0)];
	const cursorEnd = [xCursor, margin.top];

	this.makeLineThroughPoints([cursorStart, cursorEnd]);
};

Plot.prototype.useCursorStyle = function() {
	this.ctx.lineWidth = 4;
	this.ctx.strokeStyle = "rgba(0, 126, 226,0.7)";
};
export default Plot;
