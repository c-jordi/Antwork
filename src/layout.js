const layouts = [
	{
		title: "Hello World",
		size: [10, 10],
		params: [
			{ name: "numberOfAgents", value: 2 },
			{ name: "slowMo", value: true },
			{ name: "showCombinedFields", value: false },
			{ name: "showPositiveField", value: true },
			{ name: "showNegativeField", value: true },
			{ name: "showWalkers", value: true },
		],
		nodes: [
			{ name: "node_1", state: 1, coord: [2, 2] },
			{ name: "node_2", state: -1, coord: [2, 7] },
			{ name: "node_3", state: -1, coord: [7, 2] },
			{ name: "node_4", state: 1, coord: [7, 7] },
		],
		name: "helloworld",
		group: 1,
	},
	{
		title: "Empty",
		nodes: [],
		size: [30, 30],
		params: [],
		name: "Empty30",
		group: 1,
	},
	{
		title: "Switch",
		nodes: [
			{ name: "node_1", state: 1, coord: [15, 7] },
			{ name: "node_2", state: -1, coord: [15, 22] },
		],
		size: [30, 30],
		params: [],
		name: "Switch",
		group: 1,
	},
	{
		title: "Star",
		nodes: [
			{ name: "node_1", state: 1, coord: [15, 15] },
			{ name: "node_2", state: -1, coord: [10, 15] },
			{ name: "node_3", state: -1, coord: [15, 10] },
			{ name: "node_4", state: -1, coord: [20, 15] },
			{ name: "node_5", state: -1, coord: [15, 20] },
		],
		size: [30, 30],
		name: "Star",
		params: [],
		group: 1,
	},
	{
		title: "Grid",
		nodes: [0, 1, 2, 3, 4]
			.map((col) => {
				return [0, 1, 2, 3, 4].map((row) => {
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
						coord: [coord[0] + 10, coord[1] + 10],
					},
				];
			})
			.flat(),
		size: [100, 100],
		name: "Grid100",
		group: 3,
	},
	{
		title: "Empty",
		nodes: [],
		size: [90, 70],
		params: [],
		name: "Empty90x70",
		group: 2,
	},
	{
		title: "NOT GATE",
		nodes: [
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
			{ name: "node_15", state: -1, coord: [80, 65] },
		],
		size: [90, 70],
		params: [],
		name: "NOT",
		group: 2,
	},
	{
		title: "NAND GATE",
		nodes: [
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
			{ name: "node_15", state: -1, coord: [80, 65] },
		],
		size: [90, 70],
		params: [],
		name: "NAND",
		group: 2,
	},
	{
		title: "NOT/NAND GATE",
		nodes: [
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
			{ name: "node_15", state: -1, coord: [80, 65] },
		],
		size: [90, 70],
		params: [],
		events: [{ type: "node", interval: 1000 }],
		name: "NOT/NAND",
		group: 2,
	},
];

export const customSwitch = (dist) => ({
	key: "Custom",
	nodes: [
		{ name: "node_1", state: 1, coord: [15, 7] },
		{ name: "node_2", state: -1, coord: [15, 7 + +dist] },
	],
	size: [30, 30],
	params: [],
});

export default layouts;
