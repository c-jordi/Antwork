import React, { useContext } from "react";
import { simulationContext } from "../../Simulation/context/SimulationContext";
import "./Screen.css";
import Settings from "./Settings";
import Environment from "./Environment";
import Layers from "./Layers";
import Layout from "./Layout";
import Stage from "./Stage";
import Analysis from "./Analysis";

const Screen = ({ display, closeMenu, width }) => {
	const { controller } = useContext(simulationContext);
	const renderPage = () => {
		switch (display) {
			case "envr":
				return (
					<Environment
						controller={controller}
						closeMenu={closeMenu}
					></Environment>
				);
			case "settg":
				return (
					<Settings controller={controller} closeMenu={closeMenu}></Settings>
				);
			case "layers":
				return <Layers controller={controller}></Layers>;
			case "layout":
				return <Layout controller={controller} closeMenu={closeMenu}></Layout>;
			case "path":
				return <Analysis controller={controller}></Analysis>;

			default:
				return;
		}
	};
	return (
		<div className="screen" style={{ width }}>
			<Stage width={width}></Stage>
			<div
				className="page-overlay"
				style={{ height: display === "none" ? "0px" : "100%" }}
			>
				<div className="page-container">{renderPage()}</div>
			</div>
		</div>
	);
};

export default Screen;
