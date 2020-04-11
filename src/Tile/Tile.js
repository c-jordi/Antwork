import React from "react";
import "./Tile.css";

export const Tile = () => {
	return (
		<div className="tile">
			<div className="header">
				<div className="close"></div>
			</div>
			<div className="body">Name:</div>
		</div>
	);
};

export const TileCreator = () => {
	return <div className="tile-creator">Create a new simulation</div>;
};

export const TileContainer = ({ children }) => {
	return <div className="tile-container">{children}</div>;
};
