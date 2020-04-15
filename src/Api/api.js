import { findPreset, download } from "./properties";

const dataOutput = [];

function main() {
	const query = get_query();
	if (query === null) {
		return;
	}

	const { runs, frames, layoutId, size } = query;
	const preset = findPreset(layoutId, size);

	displayQueryInfo(query);
	runParrallelSimulation(frames, runs, query, preset);
}

function updateProgress(value) {
	const progressBar = document.getElementById("p-bar");
	let progress = progressBar.getAttribute("data-progress");
	const newProgress = +progress + value;
	progressBar.setAttribute("style", `width:${newProgress}%`);
	progressBar.setAttribute("data-progress", newProgress);
}

function runParrallelSimulation(frames, runs, query, preset) {
	const workersArray = [];
	const numberOfWorkers = navigator.hardwareConcurrency - 1 || 4;
	const packetSize = Math.ceil(runs / numberOfWorkers);
	let remainingRuns = runs;
	let workerStatus = 0;
	console.log("Total workers:", numberOfWorkers);
	console.log("Total runs:", runs);
	console.log("-- packet:", packetSize);
	for (let i = 0; i < numberOfWorkers; i++) {
		const _worker = new Worker("worker.js");
		_worker.addEventListener("message", function (e) {
			const msg = e.data;
			// console.log(">Worker " + i + ":", msg);
			if (msg.fn === "done") {
				console.log(`! Worker ${i} is done !`);
				_worker.terminate();
				workerStatus += 1;
				if (workerStatus === numberOfWorkers) {
					download(
						`antwork_${query.layoutId}id_${query.numberOfAgents}a_${frames}f_${runs}f.txt`,
						JSON.stringify(dataOutput)
					);
				}
			} else {
				dataOutput.push(msg.data);
				updateProgress((1 / Math.round((runs * frames) / 10)) * 100);
			}
		});

		const nbrOfRuns = Math.min(packetSize, remainingRuns);
		_worker.postMessage({
			fn: "start",
			frames,
			runs: nbrOfRuns,
			query,
			preset,
		});
		workersArray.push(_worker);

		remainingRuns -= packetSize;
	}
}

function displayQueryInfo(query) {
	document.getElementById("frames").innerText = query.frames;
	document.getElementById("runs").innerText = query.runs;
	document.getElementById("ants").innerText = query.numberOfAgents;
	document.getElementById("layout").innerText = query.layoutId;
	document.getElementById("size").innerText = query.size;
}

function get_query() {
	var search = window.location.search.substring(1);
	let query = null;
	try {
		query = JSON.parse(
			'{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
			function (key, value) {
				return key === "" ? value : decodeURIComponent(value);
			}
		);
	} catch {
		alert("Please pass a valid query!");
	}

	return query;
}

main();
