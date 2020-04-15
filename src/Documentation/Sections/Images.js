import React, { useState, useRef } from "react";

const Images = ({ imageSrcs }) => {
	const imgRef = useRef();
	const [index, setIndex] = useState(0);
	const totalImages = imageSrcs.length;
	function nextImage() {
		const newIndex = (index + 1) % totalImages;
		setIndex(newIndex);
	}

	const setImage = () => {
		return imageSrcs[index];
	};

	setTimeout(nextImage, 3000);

	return (
		<img
			ref={imgRef}
			src={setImage()}
			alt="switching images"
			style={{ width: "100%" }}
		></img>
	);
};

export default Images;
