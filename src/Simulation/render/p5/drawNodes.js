const drawNodes = (sk, env) => {
	sk.stroke(sk.color(env.nodeColor.positive));
	env.nodesCenter.positive.forEach(e => {
		sk.point(e[0], e[1]);
	});

	sk.stroke(sk.color(env.nodeColor.negative));
	env.nodesCenter.negative.forEach(e => {
		sk.point(e[0], e[1]);
	});
};

export default drawNodes;
