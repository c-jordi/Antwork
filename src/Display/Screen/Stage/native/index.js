import React, { useRef, useEffect, memo } from "react";
import DrawFunc from "./js/draw";
import "./native.css";

/**
 * Component to render the fields in a canvas using the native canvas functions
 * @param  {Object} controller Class instance of a controller
 */
const NativeStage = ({ controller, updateStats, width, height }) => {
	const uiRef = useRef();
	const gameRef = useRef();
	const backgroundRef = useRef();

	const d = new DrawFunc(controller, width, height);
	const callback = ({ id, frame }) => {
		// console.log("Id:", id, "\n- Loop frame:", frame);
		if (controller.engine.running) {
			controller.engine.next();
			controller.analysis.run();
		}
		updateStats(controller);

		d.draw(controller.analysis.displayOptions);
	};

	const id = randomString();

	const onCanvasLoad = () => {
		d.setup({
			ui: uiRef.current,
			game: gameRef.current,
			back: backgroundRef.current
		});
		controller.setupLoop(id, callback);
	};

	useEffect(() => {
		onCanvasLoad();
	});

	return (
		<div className="stage">
			<canvas id="ui-layer" className="stage-canvas" ref={uiRef}></canvas>
			<canvas id="game-layer" className="stage-canvas" ref={gameRef}></canvas>
			<canvas
				id="background-layer"
				className="stage-canvas"
				ref={backgroundRef}
			></canvas>
		</div>
	);
};

export default memo(NativeStage);

function randomString() {
	let str = "";
	for (let i = 0; i < 10; i++) {
		str += Math.floor(Math.random() * 9).toString();
	}
	return str;
}
