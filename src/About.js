import React from "react";
import Title from "./Title/Title.js";
import { Tile, TileContainer, TileCreator } from "./Tile/Tile.js";
import Documentation from "./Documentation";

const About = () => {
	return (
		<div className="home">
			<Title></Title>
			<Documentation></Documentation>
		</div>
	);
};

export default About;
