import React from "react";
import MathJax from "react-mathjax";

export const Formula = (tex) => {
	return <MathJax.Node formula={tex}></MathJax.Node>;
};

export const IFormula = (tex) => {
	return <MathJax.Node inline formula={tex}></MathJax.Node>;
};
