import React, { useState, useEffect } from "react";
import { MenuItem, MenuContainer } from "./Menu";
import Screen from "./Screen";
import "./Display.css";
import SettingsIcon from "./Icons/settings.svg";
import NodesIcon from "./Icons/nodes.svg";
import TimeIcon from "./Icons/time.svg";
import PathIcon from "./Icons/paths.svg";
import ParamsIcon from "./Icons/params.svg";
import TabsIcon from "./Icons/tabs.svg";

const Display = () => {
	const chooseWidth = width => (width > 700 ? 500 : width);
	const [display, setDisplay] = useState("none");
	const [screenWidth, setScreenWidth] = useState(
		chooseWidth(window.innerWidth)
	);

	const onResize = ({ target: { innerWidth } }) => {
		setScreenWidth(chooseWidth(innerWidth));
	};

	useEffect(() => {
		window.addEventListener("resize", onResize);

		return () => {
			window.removeEventListener("resize", onResize);
		};
	});

	const menuClick = window => {
		const newDisplay = display == window ? "none" : window;
		setDisplay(newDisplay);
	};

	const closeMenu = () => {
		setDisplay("none");
	};

	const isActive = window => window == display;
	return (
		<div className="display">
			<MenuContainer className="l-menu menu">
				<MenuItem
					window="layers"
					alt="Layers"
					icon={TabsIcon}
					menuClick={menuClick}
					isActive={isActive}
				></MenuItem>
				<MenuItem
					window="envr"
					alt="Environment"
					icon={SettingsIcon}
					menuClick={menuClick}
					isActive={isActive}
				></MenuItem>
				{/* <MenuItem
					window="settg"
					alt="Settings"
					icon={ParamsIcon}
					menuClick={menuClick}
					isActive={isActive}
				></MenuItem> */}
			</MenuContainer>
			<Screen
				display={display}
				closeMenu={closeMenu}
				width={screenWidth}
			></Screen>
			<MenuContainer className="r-menu menu">
				<MenuItem
					window="layout"
					alt="Layout"
					icon={NodesIcon}
					menuClick={menuClick}
					isActive={isActive}
				></MenuItem>
				{/* <MenuItem
					window="schdl"
					alt="Scheduler"
					icon={TimeIcon}
					menuClick={menuClick}
					isActive={isActive}
				></MenuItem> */}
				<MenuItem
					window="path"
					alt="Paths"
					icon={PathIcon}
					menuClick={menuClick}
					isActive={isActive}
				></MenuItem>
			</MenuContainer>
		</div>
	);
};

export default Display;
