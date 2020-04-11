const drawWalkers = (sk, walkers) => {
	const drawWalker = walker => {
		sk.stroke(walker.pathColor);
		const [latx, laty] = walkers.env.setPosition(walker.x, walker.y);
		sk.point(latx, laty);
	};

	walkers.apply(drawWalker);
};

export default drawWalkers;
