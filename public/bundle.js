!(function () {
	"use strict";
	const e = [
		{ key: "Empty30", nodes: [], size: [30, 30] },
		{
			key: "Start",
			nodes: [
				{ name: "node_1", state: 1, coord: [15, 15] },
				{ name: "node_2", state: -1, coord: [10, 15] },
				{ name: "node_3", state: -1, coord: [15, 10] },
				{ name: "node_4", state: -1, coord: [20, 15] },
				{ name: "node_5", state: -1, coord: [15, 20] },
			],
			size: [30, 30],
		},
		{
			key: "Switch",
			nodes: [
				{ name: "node_1", state: 1, coord: [15, 7] },
				{ name: "node_2", state: -1, coord: [15, 22] },
			],
			size: [30, 30],
		},
		{
			key: "Star",
			nodes: [
				{ name: "node_1", state: 1, coord: [15, 15] },
				{ name: "node_2", state: -1, coord: [10, 15] },
				{ name: "node_3", state: -1, coord: [15, 10] },
				{ name: "node_4", state: -1, coord: [20, 15] },
				{ name: "node_5", state: -1, coord: [15, 20] },
			],
			size: [30, 30],
		},
		{
			key: "Grid100",
			nodes: [0, 1, 2, 3, 4]
				.map((e) => [0, 1, 2, 3, 4].map((t) => [20 * e, 20 * t]))
				.flat()
				.map((e, t) => [
					{ name: "node_p" + t, state: 1, coord: e },
					{ name: "node_n" + t, state: -1, coord: [e[0] + 10, e[1] + 10] },
				])
				.flat(),
			size: [100, 100],
		},
		{ key: "Empty90x70", nodes: [], size: [90, 70] },
		{
			key: "NOT",
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
		},
		{
			key: "NAND",
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
		},
	];
	const t = [];
	function o(e) {
		const t = document.getElementById("p-bar");
		const o = +t.getAttribute("data-progress") + e;
		t.setAttribute("style", `width:${o}%`), t.setAttribute("data-progress", o);
	}
	!(function () {
		const n = (function () {
			var e = location.search.substring(1);
			let t = null;
			try {
				t = JSON.parse(
					'{"' + e.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
					function (e, t) {
						return "" === e ? t : decodeURIComponent(t);
					}
				);
			} catch {
				alert("Please pass a valid query!");
			}
			return t;
		})();
		if (null === n) return;
		const { runs: a, frames: d, layoutId: s } = n;
		!(function (e) {
			(document.getElementById("frames").innerText = e.frames),
				(document.getElementById("runs").innerText = e.runs),
				(document.getElementById("ants").innerText = e.numberOfAgents),
				(document.getElementById("size").innerText = e.layoutId);
		})(n),
			(function (e, n, a, d) {
				const s = navigator.hardwareConcurrency - 1 || 3,
					r = Math.ceil(n / s);
				let c = n,
					m = 0;
				console.log("Total workers:", s),
					console.log("Total runs:", n),
					console.log("-- packet:", r);
				for (let i = 0; i < s; i++) {
					const i = new Worker("worker.js");
					i.addEventListener("message", function (a) {
						const d = a.data;
						var r, c, u;
						"done" == d.fn
							? (i.terminate(),
							  (m += 1),
							  m === s &&
									((r = "antwork_api.txt"),
									(c = JSON.stringify(t)),
									(u = document.createElement("a")).setAttribute(
										"href",
										"data:text/plain;charset=utf-8," + encodeURIComponent(c)
									),
									u.setAttribute("download", r),
									(u.style.display = "none"),
									document.body.appendChild(u),
									u.click(),
									document.body.removeChild(u)))
							: (t.push(d.data), o((1 / Math.round((n * e) / 20)) * 100));
					});
					const u = Math.min(r, c);
					i.postMessage({
						fn: "start",
						frames: e,
						runs: u,
						query: a,
						preset: d,
					}),
						(c -= r);
				}
			})(
				d,
				a,
				n,
				(function (t) {
					const o = e.find((e) => e.key == t);
					return void 0 === o ? e.find((e) => "Switch" === e.key) : o;
				})(s)
			);
	})();
})();
//# sourceMappingURL=bundle.js.map
