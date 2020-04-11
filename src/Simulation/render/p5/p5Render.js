import "../lib/p5.js";
import drawNodes from "./drawNodes";
import drawFields from "./drawFields";
import drawWalkers from "./drawWalkers";
import drawCombinedFields from "./drawCombinedField";

const p5Render = (
	parentId,
	{ walkers, env, engine, analysis },
	{ backgroundColor },
	callbacks
) => {
	console.log("P5 Render");
	let counter = 0;

	const s = sk => {
		sk.setup = function() {
			let canvas = sk.createCanvas(...env.size);
			canvas.parent(parentId);
			sk.frameRate(env.framerate);
		};

		sk.mouseClicked = function() {
			console.log(
				"Mouse clicked:",
				Math.floor(sk.mouseX),
				Math.floor(sk.mouseY)
			);
			return true;
		};

		sk.draw = function() {
			sk.frameRate(env.framerate);
			sk.background(backgroundColor);
			engine.next();
			analysis.run();
			callbacks.updateCounter(engine.counter);
			// Drawing the fields
			if (
				analysis.displayOptions.showPositiveField ||
				analysis.displayOptions.showNegativeField
			)
				drawFields(sk, env, analysis);

			// Drawing the combined fields
			if (analysis.displayOptions.showCombinedFields)
				drawCombinedFields(sk, analysis);

			// Drawing the random walker
			if (analysis.displayOptions.showWalkers) drawWalkers(sk, walkers);

			// Drawing the nodes
			if (analysis.displayOptions.showNodes) drawNodes(sk, env);
		};
	};

	return new p5(s);
};

export default p5Render;
