export const generateFig3 = () => {
	const seq = [0, 1, 2, 3, 4];

	const positive = seq
		.map(row => {
			return seq.map(col => {
				return [row * 20, col * 20];
			});
		})
		.flat();

	const negative = seq
		.map(row => {
			return seq.map(col => {
				return [row * 20 + 10, col * 20 + 10];
			});
		})
		.flat();

	return {
		lattice: "square",
		size: [100, 100],
		nodesCenter: { positive, negative }
	};
};
