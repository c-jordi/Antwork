import React from "react";
import { Formula, IFormula } from "./Formula";
import Fig3 from "../Ressources/fig3.svg";
import Fig4 from "../Ressources/fig4.svg";
import Fig5 from "../Ressources/fig5.svg";

const Implementation = () => {
	return (
		<section className="implementation">
			<h2 class="code-line" data-line-start="0" data-line-end="1">
				Implementation
			</h2>
			<p class="has-line-data" data-line-start="1" data-line-end="2">
				The model is implemented on 2d square lattice with periodic boundary
				conditions. Agents and nodes occupy a single cell on the lattice.
			</p>
			<p class="has-line-data" data-line-start="3" data-line-end="4">
				As mentioned previously, the coefficients for {IFormula("(+)")} and{" "}
				{IFormula("(-)")} chemicals are taken to be equal:
			</p>
			<blockquote>
				<p class="has-line-data" data-line-start="4" data-line-end="5">
					{IFormula("s^0_{+1}=s^0_{-1}=s_0")},{"  "}
					{IFormula("k_{+1}=k_{-1}=k_h")}, {"  "}
					{IFormula("\\beta_{+1}=\\beta_{-1}=\\beta")}
				</p>
			</blockquote>
			<p class="has-line-data" data-line-start="6" data-line-end="7">
				The simulation is comprised of several steps that occur in the following
				order.
			</p>
			<ol>
				<li class="has-line-data" data-line-start="8" data-line-end="9">
					Agents move according to the gradient of the field
				</li>
				<li class="has-line-data" data-line-start="9" data-line-end="10">
					Agents emit in the chemical fields
				</li>
				<li class="has-line-data" data-line-start="10" data-line-end="12">
					The evolution of the chemical fields is computed
				</li>
			</ol>
			<blockquote>
				<p class="has-line-data" data-line-start="12" data-line-end="13">
					<img src={Fig3} alt="Fig3" style={{ width: "100%" }} />
				</p>
			</blockquote>
			<p class="has-line-data" data-line-start="15" data-line-end="16">
				The movement of the agents is discretized and restricted to a single
				step in four possible directions: up, down, left and right. The discrete
				setting is necessary to compute the spatial gradients of the field. For
				every cell containing an agent, the gradient of the fields is computed
				in the vertical and horizontal directions using Euler equations. The
				discretized nature of the setting did not require the use of more
				precise or advanced methods such as Runge Kutta. For every agent i, the{" "}
				{IFormula("\\frac{dr_i}{dt}")}vector is computed by adding the gradient
				of the field and a contribution from the noise. Then the scalar product
				with the four unit vectors: {IFormula("\\hat{e_x}")},
				{IFormula("-\\hat{e_x}")},{IFormula("\\hat{e_y}")} and{" "}
				{IFormula("-\\hat{e_y}")} is calculated.
			</p>
			<blockquote>
				<p class="has-line-data" data-line-start="16" data-line-end="17">
					{IFormula("q_{ij} =  \\frac{dr_i}{dt} \\cdot \\hat{e_j}")} with{" "}
					{IFormula(
						"\\hat{e_j} \\in \\{ \\hat{e_x},-\\hat{e_x},\\hat{e_y} ,-\\hat{e_y}\\}"
					)}
				</p>
			</blockquote>
			<p class="has-line-data" data-line-start="18" data-line-end="19">
				The agent will then take a step along the vector with the largest scalar
				product or will randomly choose between two vectors with equal scalar
				products. The position of the agent will be compared to the position of
				the nodes to determine if the internal polarity of the agent must
				change.
			</p>
			<p class="has-line-data" data-line-start="20" data-line-end="21">
				After all agents have taken their step, the emitted chemicals are
				combined with the residue fields for both the positive and negative
				chemicals. The chemical fields for the next time step can be determined
				by adding the fields from the previous time step and their respective
				temporal gradients.
			</p>
			<p class="has-line-data" data-line-start="22" data-line-end="23">
				The connectivity of the lattice is determined using an implementation of
				a Tree Burning algorithm.
			</p>

			<h3 class="code-line" data-line-start="26" data-line-end="27">
				A couple caveats
			</h3>
			<ul>
				<li class="has-line-data" data-line-start="28" data-line-end="29">
					The size of the nodes and the total number of agents will impose an
					implicit limit of the number of trails that can enter or leave a
					single node.
				</li>
			</ul>
			<blockquote>
				<p class="has-line-data" data-line-start="29" data-line-end="30">
					<img src={Fig4} alt="Fig4" style={{ width: "100%" }} />
				</p>
			</blockquote>
			<ul>
				<li class="has-line-data" data-line-start="31" data-line-end="33">
					In our implementation we opted for a square lattice where the movement
					is restricted to four directions: left,right,up and down. Other
					lattices could have been used which would have changed the speed of
					propagation of the walkers in certain directions.
				</li>
			</ul>
			<blockquote>
				<p class="has-line-data" data-line-start="33" data-line-end="34">
					<img src={Fig5} alt="Fig5" style={{ width: "100%" }} />
				</p>
			</blockquote>
		</section>
	);
};

export default Implementation;
