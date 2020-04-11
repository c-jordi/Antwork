import generateField from "./generateField";

export default function generateInitialFields(buffer, size, fill = null) {
	return Array(buffer)
		.fill(0)
		.map(el => {
			return generateField(size, fill);
		});
}
