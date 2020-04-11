const drawFields = (sk, env, analysis) => {
	if (analysis.displayOptions.showPositiveField) {
		for (let xCoord = 0; xCoord < env.fields.positive[0].length; xCoord++) {
			for (
				let yCoord = 0;
				yCoord < env.fields.positive[0][xCoord].length;
				yCoord++
			) {
				const fieldStrength = env.fields.positive[0][xCoord][yCoord];
				sk.stroke(
					sk.color(
						`rgba(${env.nodeColor.positive.join(",")},${transform(
							fieldStrength,
							analysis.maxima,
							analysis.fineGrain
						)})`
					)
				);
				sk.point(xCoord, yCoord);
			}
		}
	}

	if (analysis.displayOptions.showNegativeField) {
		for (let xCoord = 0; xCoord < env.fields.negative[0].length; xCoord++) {
			for (
				let yCoord = 0;
				yCoord < env.fields.negative[0][xCoord].length;
				yCoord++
			) {
				const fieldStrength = env.fields.negative[0][xCoord][yCoord];
				sk.stroke(
					sk.color(
						`rgba(${env.nodeColor.negative.join(",")},${transform(
							fieldStrength,
							analysis.maxima,
							analysis.fineGrain
						)})`
					)
				);
				sk.point(xCoord, yCoord);
			}
		}
	}
};

function transform(x, { max, min }, fineGrain) {
	const tr = Math.log10(1 + (9 * fineGrain * (x - min)) / (max - min));
	if (tr < 1e-2) return 0;
	if (tr > 1) return 1;
	return tr;
}

export default drawFields;
