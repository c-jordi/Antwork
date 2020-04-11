import "../lib/Chart.js";

const defaultOptions = {
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: true
				}
			}
		]
	}
};

function Plot(ctx, { name, type = "line", options = defaultOptions }) {
	// creates a chart class
	this.chart = null;
	this.type = type;
	this.name = name;
	this.options = options;
	this.init(ctx);
}
Plot.prototype.init = function(ctx) {
	this.chart = new Chart(ctx, {
		type: this.type,
		data: {
			labels: [],
			datasets: []
		},
		options: this.options
	});
};

Plot.prototype.addData = function(label, x, y) {
	const isLabelExisting = this.chart.data.datasets.some(
		dataset => dataset.label == label
	);

	if (!isLabelExisting)
		this.chart.data.datasets.push({
			label,
			data: [],
			borderWidth: 1
		});
	this.chart.data.labels.push(x);
	this.chart.data.datasets.forEach(dataset => {
		dataset.data.push(dataset.label == label ? y : null);
	});
	this.chart.update();
};

export default Plot;
