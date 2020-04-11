export default function generateField(size = [100, 100], fill = null) {
	return Array(size[0])
		.fill(0)
		.map(el => {
			if (Array.isArray(fill)) {
				return Array(size[1])
					.fill(0)
					.map(el => fill.slice());
			}
			if (!isNaN(fill)) {
				return Array(size[1]).fill(fill);
			}

			return Array(size[1]);
		});
}
