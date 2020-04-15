export function drawNodes(canvas, nodes, size) {
	const ctx = canvas.getContext("2d");
	const width = canvas.width;
	const height = canvas.height;
	const xscale = width / size[0];
	const yscale = height / size[1];
	const scale = xscale < yscale ? xscale : yscale;
	const xoffset = Math.round(width - xscale * size[0]);
	const yoffset = Math.round(height - yscale * size[1]);

	nodes.forEach(({ state, coord }) => {
		ctx.fillStyle = state === 1 ? "rgb(246, 255, 51)" : "rgb(51, 255, 240)";
		ctx.fillRect(
			Math.round(coord[0] * scale - scale) + xoffset,
			Math.round(coord[1] * scale - scale) + yoffset,
			Math.ceil(scale * 3),
			Math.ceil(scale * 3)
		);
	});
}
