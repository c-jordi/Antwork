const ratioOfNorms = (arr1, arr2) => {
	const normArr1 = Math.sqrt(arr1[0] ** 2 + arr1[1] ** 2);
	const normArr2 = Math.sqrt(arr2[0] ** 2 + arr2[1] ** 2);
	return normArr1 / normArr2;
};
export default ratioOfNorms;
