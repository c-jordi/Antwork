import React, { memo, useRef, useEffect } from "react";
import ConnectivityPlot from "./Connectivity";
import "./Plots.css";

const Plots = ({ data }) => {
	const plotRef = useRef();

	useEffect(() => {
		const canvas = plotRef.current;
		const Plot = new ConnectivityPlot(canvas);

		Plot.draw(data);

		canvas.addEventListener("mousemove", Plot.setMousePosition);
		return () => {
			canvas.removeEventListener("mousemove", Plot.setMousePosition);
		};
	});
	return (
		<canvas ref={plotRef} width={1200} height={600} className="plot"></canvas>
	);
};

const arePropsEqual = (prevProps, nextProps) => {
	if (prevProps.data === undefined || nextProps.data === undefined) {
		return false;
	}
	return prevProps.data.length === nextProps.data.length;
};

export default memo(Plots, arePropsEqual);
