export default function displayArray(array) {
	if (Array.isArray(array) & Array.isArray(array[0])) {
		if (array[0].length == 2) {
			const stringArray = array.map(el => `${el[0]},${el[1]}`);
			console.log(...stringArray);
			console.log("-\n");
			return;
		} else {
			array.map(el => displayArray(el));
			return;
		}
	} else if (Array.isArray(array)) {
		let emptyArray = Array(array.length).fill("0.0");
		array.map((el, index) => {
			emptyArray[index] = el.toFixed(1);
		});
		console.log(...emptyArray);
		console.log("-\n");
		return;
	} else {
		console.log("Please pass an array...");
	}
}
