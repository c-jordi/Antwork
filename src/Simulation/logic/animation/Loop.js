function Loop(id, callback, defaultCallback, setId) {
	this.minInt = 0; //30fps
	this.maxFrames = 10000;
	this.id = id;
	this.frame = -1;
	this.callback = callback;
	this.defaultCallback = defaultCallback;
	this.start = this.start.bind(this);
	this.step = this.step.bind(this);
	this.request = (func) => {
		setId(window.requestAnimationFrame(func));
	};
}

Loop.prototype.start = function () {
	this.startTime = performance.now();
	this.request(this.step);
};

Loop.prototype.step = function () {
	// if (this.frame >= this.maxFrames - 1) return;
	if (performance.now() - this.startTime > this.minInt) {
		this.frame++;
		this.callback({ id: this.id, frame: this.frame });
		this.startTime = performance.now();
	} else {
		this.defaultCallback();
	}
	this.request(this.step);
};

Loop.prototype.slowMo = function (state) {
	this.minInt = state ? 400 : 0;
};

export default Loop;
