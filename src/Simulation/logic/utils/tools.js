export const copy = (obj) => {
	return JSON.parse(JSON.stringify(obj));
};

export const uuid = () => {
	return "xxxxxxxx".replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};
