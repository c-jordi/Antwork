import React from "react";
import Preset, { PresetBox } from "./Preset";

const Layout = ({ closeMenu }) => {
	return (
		<div className="page layout">
			<div className="title">Layout</div>
			<div className="body">
				{/* <div className="subtitle white">Presets</div> */}
				<PresetBox>
					<Preset
						title="Empty"
						nodes={[]}
						size={[30, 30]}
						params={{}}
						closeMenu={closeMenu}
						key="Empty30"
						name="Empty30"
					/>
					<Preset
						title="Switch"
						nodes={[
							{ name: "node_1", state: 1, coord: [15, 7] },
							{ name: "node_2", state: -1, coord: [15, 22] }
						]}
						size={[30, 30]}
						params={{}}
						closeMenu={closeMenu}
						key="Switch"
						name="Switch"
					/>

					<Preset
						title="Star"
						nodes={[
							{ name: "node_1", state: 1, coord: [15, 15] },
							{ name: "node_2", state: -1, coord: [10, 15] },
							{ name: "node_3", state: -1, coord: [15, 10] },
							{ name: "node_4", state: -1, coord: [20, 15] },
							{ name: "node_5", state: -1, coord: [15, 20] }
						]}
						size={[30, 30]}
						params={{}}
						closeMenu={closeMenu}
						key="Star"
						name="Star"
					/>
					<Preset
						title="Grid"
						nodes={[0, 1, 2, 3, 4]
							.map(col => {
								return [0, 1, 2, 3, 4].map(row => {
									return [col * 20, row * 20];
								});
							})
							.flat()
							.map((coord, i) => {
								return [
									{ name: "node_p" + i, state: 1, coord },
									{
										name: "node_n" + i,
										state: -1,
										coord: [coord[0] + 10, coord[1] + 10]
									}
								];
							})
							.flat()}
						size={[100, 100]}
						closeMenu={closeMenu}
						key="Grid100"
						name="Grid100"
					></Preset>
				</PresetBox>
				<PresetBox>
					<Preset
						title="Empty"
						nodes={[]}
						size={[90, 70]}
						params={{}}
						closeMenu={closeMenu}
						key="Empty90x70"
						name="Empty90x70"
					/>
					<Preset
						title="NOT GATE"
						nodes={[
							{ name: "node_1", state: 1, coord: [30, 5] },
							{ name: "node_2", state: -1, coord: [30, 20] },
							{ name: "node_3", state: 1, coord: [45, 20] },
							{ name: "node_4", state: -1, coord: [60, 20] },
							{ name: "node_5", state: -1, coord: [10, 20] },
							{ name: "node_6", state: 1, coord: [20, 35] },
							{ name: "node_8", state: -1, coord: [35, 50] },
							{ name: "node_9", state: 1, coord: [25, 60] },
							{ name: "node_10", state: 1, coord: [50, 50] },
							{ name: "node_11", state: -1, coord: [65, 50] },
							{ name: "node_12", state: 1, coord: [80, 50] },
							{ name: "node_13", state: -1, coord: [50, 65] },
							{ name: "node_14", state: 1, coord: [65, 40] },
							{ name: "node_15", state: -1, coord: [80, 65] }
						]}
						size={[90, 70]}
						params={{}}
						closeMenu={closeMenu}
						key="NOT"
						name="NOT"
					/>

					<Preset
						title="NAND GATE"
						nodes={[
							{ name: "node_1", state: 1, coord: [30, 5] },
							{ name: "node_2", state: -1, coord: [30, 20] },
							{ name: "node_3", state: 1, coord: [45, 20] },
							{ name: "node_4", state: -1, coord: [60, 20] },
							{ name: "node_5", state: -1, coord: [10, 20] },
							{ name: "node_6", state: 1, coord: [20, 35] },
							{ name: "pivot", state: 1, coord: [25, 40] },
							{ name: "node_8", state: -1, coord: [35, 50] },
							{ name: "node_9", state: 1, coord: [25, 60] },
							{ name: "node_10", state: 1, coord: [50, 50] },
							{ name: "node_11", state: -1, coord: [65, 50] },
							{ name: "node_12", state: 1, coord: [80, 50] },
							{ name: "node_13", state: -1, coord: [50, 65] },
							{ name: "node_14", state: 1, coord: [65, 40] },
							{ name: "node_15", state: -1, coord: [80, 65] }
						]}
						size={[90, 70]}
						params={{}}
						closeMenu={closeMenu}
						key="NAND"
						name="NAND"
					/>
				</PresetBox>
			</div>
		</div>
	);
};
export default Layout;
