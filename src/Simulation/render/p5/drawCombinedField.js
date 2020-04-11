const drawCombinedField = (sk, analysis) => {
	for (let x = 0; x < analysis.combinedField.length; x++) {
		for (let y = 0; y < analysis.combinedField[x].length; y++) {
			const fieldStrength = analysis.combinedField[x][y];
			sk.stroke(
				sk.color(
					`rgba(106,13,173,${transform(
						fieldStrength,
						analysis.maxima,
						analysis.fineGrain
					)})`
				)
			);

			sk.point(x, y);
		}
	}
};

function transform(x, { max, min }, fineGrain) {
	const tr = Math.log10(1 + (9 * fineGrain * (x - min)) / (max - min));
	if (tr < 1e-2) return 0;
	if (tr > 1) return 1;
	return tr;
}

export default drawCombinedField;
