import React from "react";
import Preset, { PresetBox } from "./Preset";
import layouts from "../../../layout.js";

const Layout = ({ closeMenu }) => {
	const generateLayout = () => {
		const maxGroup = Math.max(...layouts.map(({ group }) => group)) + 1;
		const groups = new Array(maxGroup).fill(0).map(() => []);
		layouts.forEach((layout) => {
			groups[layout.group].push(layout);
		});

		const createPreset = (layout) => {
			return <Preset {...layout} closeMenu={closeMenu} key={layout.name} />;
		};

		const layout = groups.map((group) => {
			return <PresetBox>{group.map(createPreset)}</PresetBox>;
		});

		return layout;
	};

	return (
		<div className="page layout">
			<div className="title">Layout</div>
			<div className="body">{generateLayout()}</div>
		</div>
	);
};
export default Layout;
