import p5Render from "./p5/p5Render";
import nativeRender from "./native/nativeRender";

const Render = ({ renderer, controller, parentId, frameRate = 30 }) => {
	const renderParams = {
		backgroundColor: 20
	};
	switch (renderer) {
		case "p5":
			return p5Render(parentId, controller, renderParams, {
				updateCounter
			});

		case "native":
			return nativeRender(parentId, controller);

		default:
			console.log("No renderer was selected");
	}
};

export default Render;
