function Walker(name, x, y, state) {
	this.name = name;
	this.state = state; // string ["positive","negative"]
	this.timeSinceCollision = 0;
	this.x = x;
	this.y = y;
	this.dr = Array(4).fill(null);
	this.pathColor = [255, 255, 255];
}

export default Walker;
