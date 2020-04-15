import React from "react";
import { Formula, IFormula } from "./Formula";
import Images from "./Images";
import Fig6 from "../Ressources/fig6.svg";
import Fig7 from "../Ressources/fig7.svg";
import Fig7a from "../Ressources/fig7a.svg";
import Fig7b from "../Ressources/fig7b.svg";
import Fig7c from "../Ressources/fig7c.svg";
import Fig7d from "../Ressources/fig7d.svg";

const ComputationalModel = () => {
	return (
		<section className="computational-model">
			<h1 className="code-line" data-line-start="0" data-line-end="1">
				Computation on a network
			</h1>
			<h2 className="code-line" data-line-start="2" data-line-end="3">
				The model
			</h2>
			<p className="has-line-data" data-line-start="4" data-line-end="5">
				The computation on the generated networks is provided by an Active
				Matter logic framework developped by Woodhouse and Dunkel. The logic
				results from the combination of global incompressibility and local
				energy constraints. Let’s begin by quickly reviewing their framework.
			</p>
			<p className="has-line-data" data-line-start="6" data-line-end="8">
				The model is defined on an oriented graph {IFormula("\\Gamma")} made of
				vertices {IFormula("V")} and edges {IFormula("E")}. On the graph, every
				edge is assigned an arbitrary reference direction. The flow of each edge
				is given by {IFormula("\\phi_e \\in \\mathbb{R}")}, where{" "}
				{IFormula("\\phi_e>0")} and {IFormula("\\phi_e<0")} correspond to a flow
				in and against the reference direction respectively. The flows on the
				graph are given by the vector {IFormula("\\Phi = (\\phi_e)")}. The
				matrix {IFormula("D = (D_{ve})")} is the signed incidence matrix of{" "}
				{IFormula("\\Gamma")} so that {IFormula("D_{ve}")} is {IFormula("+1")}{" "}
				if {IFormula("e")} enters {IFormula("v")}, {IFormula("-1")} if{" "}
				{IFormula("e")} leaves {IFormula("v")} and {IFormula("0")} if{" "}
				{IFormula("e")} is not incident to {IFormula("v")}.<br />
				To model the flow, they provide the following Hamiltonian:
			</p>
			<blockquote>
				<p
					className="has-line-data"
					data-line-start="9"
					data-line-end="10"
					style={{ fontSize: "min(3vw,15px)" }}
				>
					{Formula(
						"H_0=\\lambda \\sum\\limits_{e\\in E}( -\\frac{1}{4}\\phi^4_e+\\frac{1}{6}\\phi_e^6) +  \\frac{1}{2}\\mu \\sum\\limits_{v\\in V}(D \\cdot \\Phi)_v^2"
					)}
				</p>
			</blockquote>
			<p className="has-line-data" data-line-start="11" data-line-end="12">
				The first sum contains the unidirectional flow condition. To minimize
				the sum, flow values of the edges tend to{" "}
				{IFormula("\\phi_e \\rightarrow \\pm 1")} or {IFormula("0")}. The second
				sum imposes the soft incompressibility constraint such that the net flex{" "}
				{IFormula("(D\\cdot \\Phi)_v")} at each vertex approaches{" "}
				{IFormula("0")}.
			</p>
			<blockquote>
				<p className="has-line-data" data-line-start="13" data-line-end="14">
					<img style={{ width: "100%" }} src={Fig6} alt="Fig6" />
				</p>
			</blockquote>
			<p className="has-line-data" data-line-start="15" data-line-end="16">
				The model can be expanded to implement inputs and outputs by allowing a
				non zero flux on certain vertices, while maintaining the general
				incompressibility condition on the rest of the graph. This is done by
				defining a new set of boundary vertices with a degree of 1 belonging to{" "}
				{IFormula("\\partial\\Gamma")}. The set{" "}
				{IFormula(
					"\\partial\\Gamma =\\partial\\Gamma_{in} \\cup \\partial\\Gamma_{out}"
				)}{" "}
				is made of the input and output vertices. Input vertices are constrained
				to have a net outward flux of their binary input {IFormula("I_v")} and
				output vertices are unconstrained. This is achieved by adding the
				hamiltonian {IFormula("H_{\\partial\\Gamma}")} to the total hamiltionan.
			</p>
			<blockquote>
				<p className="has-line-data" data-line-start="17" data-line-end="18">
					{Formula(
						"H_{\\partial\\Gamma} = \\frac{1}{2} \\mu\\sum\\limits_{v \\in \\partial\\Gamma_{in}} [(D\\cdot\\Phi)_v+I_v]^2"
					)}
				</p>
			</blockquote>
			<p className="has-line-data" data-line-start="19" data-line-end="21">
				As one can see, the hamiltonian will attempt to equalize for each input
				vertex the terms {IFormula("(D\\cdot\\Phi)_v \\approx I_v")}.<br />
				One last feature of the model are the inclusion of diode edges{" "}
				{IFormula("E_{+}\\subset E")} that only allow the flow to occur in a
				given direction. If the flow is negative {IFormula("\\phi_e < 0")}, a
				diode energy {IFormula("H_{+} = \\infty")} is added to the total
				hamiltonian. The total hamiltonian is given by:
			</p>
			<blockquote>
				<p className="has-line-data" data-line-start="22" data-line-end="23">
					{Formula("H= H_0 + H_{\\partial \\Gamma} + H_{+}")}
				</p>
			</blockquote>
			<h2 className="code-line" data-line-start="25" data-line-end="26">
				The gates
			</h2>
			<p className="has-line-data" data-line-start="26" data-line-end="27">
				Using the previous framework, Woodhouse and Dunkel were able to
				determine multiple graphs with input vertices that would display the
				behaviour of simple computational gates such as: OR, AND,NOT and NAND.
				The NOT and NAND gates are displayed below.
			</p>
			<blockquote>
				<p className="has-line-data" data-line-start="27" data-line-end="28">
					<Images imageSrcs={[Fig7, Fig7a, Fig7b, Fig7c, Fig7d]}></Images>
				</p>
			</blockquote>
			<p className="has-line-data" data-line-start="29" data-line-end="30">
				In this project, we will be attempting to recreate these two gates. The
				structural similarity of these gates will be used to toggle between them
				through the activation or deactivation of a pivot node.
			</p>
		</section>
	);
};

export default ComputationalModel;
