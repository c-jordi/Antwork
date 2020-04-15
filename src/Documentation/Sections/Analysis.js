import React from "react";
import Preview from "../Preview";
import { Formula, IFormula } from "./Formula";
import Fig8 from "../Ressources/fig8.svg";
import OnOffImg from "../Ressources/onoff.png";
import SwitchImg from "../Ressources/switch.png";
import DensityImg from "../Ressources/density.png";
import SwitchAImg from "../Ressources/switchA.png";
import SwitchBImg from "../Ressources/switchB.png";

const Analysis = () => {
	return (
		<section className="doc-analysis">
			<h1 class="code-line" data-line-start="0" data-line-end="1">
				Results
			</h1>
			<p class="has-line-data" data-line-start="2" data-line-end="3">
				To validate the implementation of the network formation agent based
				model, we begin by recreating a simple switch. Two nodes, positive and
				negative, are placed on a 30 by 30 lattice.
			</p>
			<p class="has-line-data" data-line-start="4" data-line-end="5">
				<Preview
					params={{
						title: "switch",
						text: "Simple switch with 2 nodes",
						name: "Switch",
					}}
				></Preview>
			</p>
			<p class="has-line-data" data-line-start="6" data-line-end="7">
				We begin by measuring the mean connection time needed to connect two
				nodes at a distance L. These results are obtained by averaging 100
				simulations for each length. The results are displayed below on a
				logarithmic scale.
			</p>
			<blockquote>
				<p class="has-line-data" data-line-start="8" data-line-end="9">
					<img src={SwitchImg} style={{ width: "100%" }} alt="Switch" />
				</p>
			</blockquote>
			<p class="has-line-data" data-line-start="10" data-line-end="11">
				As we can see, when the distance increases, the connection time{" "}
				{IFormula("t_{con}")} increases exponentially before diverging at a
				distance of {IFormula("22")}. The distance around which the connection
				time diverges depends on the environment parameters and the density of
				walkers on the lattice ({IFormula("n=0.5")}). This experiment can be
				used to define an approximate parameter and node separation limit for
				which intricate structures with more nodes, sustaining several
				connections, can be created.
			</p>
			<p class="has-line-data" data-line-start="12" data-line-end="13">
				We continue by measuring the connectivity of the switch over time as the
				value of the parameter {IFormula("\\beta")} alternates between{" "}
				{IFormula("0.3")} and {IFormula("0.9")}. We display the average of the
				connectivity after averaging over 400 samples.
			</p>
			<blockquote>
				<p class="has-line-data" data-line-start="14" data-line-end="15">
					<img src={OnOffImg} style={{ width: "100%" }} alt="OnOff" />
				</p>
			</blockquote>
			<p class="has-line-data" data-line-start="16" data-line-end="17">
				As one can see from the plot, when the parameter {IFormula("\\beta")}{" "}
				(exponential decay in the emission) increases to 1, the connectivity of
				the switch rapidly drops down to 0. The walkers’s emission rates decay
				too rapidly to sustain a path between two nodes. However, the following
				transient period (time during which the network establishes itself)
				might be shorter if the time elapsed between two activations (
				{IFormula("\\beta =0.3")}) is short enough. Traces of the previous paths
				remain in the chemical fields and walkers quickly reestablish these
				routes.
			</p>
			<p class="has-line-data" data-line-start="18" data-line-end="19">
				We now try to construct the NAND and NOT gates that we introduced
				previously. To do so, we begin by laying down a set of positive and
				negatives nodes, such that the expected connection pattern will recreate
				the gates. While doing so, it is important to keep in mind that nodes of
				opposite polarity are more likely to be connected if they are close
				together. In addition, for a node to sustain multiple connections, we
				must make sure that the edges are coming in contact with the node from
				different angles.
			</p>
			<p class="has-line-data" data-line-start="20" data-line-end="21">
				<Preview
					params={{
						title: "NAND gate",
						text: "Implementation of the NAND gate",
						name: "NAND",
					}}
				></Preview>
				<Preview
					params={{
						title: "NOT gate",
						text: "Implementation of the NOT gate",
						name: "NOT",
					}}
				></Preview>
			</p>
			<p class="has-line-data" data-line-start="22" data-line-end="23">
				We were able to come up with two layouts, for the NAND and NOT gates
				respectively, that differed in a single node. The advantage being that
				by removing or adding that pivotal node, we can toggle between the two
				gates. To improve the placement of the nodes, we calculated the average
				connectivity of the edges over 200 simulations with 3250 walkers for a
				lattice of size 90 by 70.
			</p>
			<blockquote>
				<p class="has-line-data" data-line-start="24" data-line-end="25">
					<img src={Fig8} style={{ width: "100%" }} alt="Fig8" />
				</p>
			</blockquote>
			<p class="has-line-data" data-line-start="26" data-line-end="27">
				The figure above shows the average connectivity for the NAND gate. As we
				can see, an edge is missing between two nodes. Thus, the layout was
				altered to bring the two nodes closer to permit a connection. One could
				imagine using the average edge connectivity combined with an algorithmic
				optimization procedure to dynamically position the nodes given a desired
				network structure.
			</p>
			<p class="has-line-data" data-line-start="28" data-line-end="29">
				To estimate the effect of the number of walkers on the network formation
				of the NAND gate, we measured the average connectivity as a function of
				the number of walkers for a 90 by 70 lattice.
			</p>
			<blockquote>
				<p class="has-line-data" data-line-start="29" data-line-end="30">
					<img src={DensityImg} style={{ width: "100%" }} alt="Density" />
				</p>
			</blockquote>
			<p class="has-line-data" data-line-start="31" data-line-end="32">
				We see that for a density superior to {IFormula("n=0.5")}, which amounts
				to around 3250 walkers, the average number of connections hardly
				increases. One can therefore assume that the nodes, that are within
				reach of eachother, are connected.
			</p>

			<p class="has-line-data" data-line-start="0" data-line-end="1">
				We conclude our analysis by looking at the switching behavior between
				the NAND and the NOT gates. To do so, we initiated a simulation with the
				NOT gate layout (with pivot node on). After the first 1500 steps, we
				switched the layout to a NAND Gate by removing the pivot node. After
				3000 steps, we reinstated the NOT gate. The results displayed below are
				the average of 50 simulations.
			</p>
			<blockquote>
				<p class="has-line-data" data-line-start="2" data-line-end="3">
					<img src={SwitchAImg} style={{ width: "100%" }} alt="NANDSwitchA" />
				</p>
			</blockquote>
			<p class="has-line-data" data-line-start="4" data-line-end="5">
				Shortly after the beginning of the simulation, the NOT gate is
				successfully constructed. When the pivot node is turned off, the edge
				connecting that node with the rest of the NOT gate layout quickly
				disappears. This is shown by the slight drop in average connectivity.
				The closest node in the NAND gate layout quickly takes over the
				connection. The NAND gate is now active. However, when the pivot node is
				turned on again, the pivot node is not able to reinstate its previous
				connection as his walkers have been hijacked by another trail. The
				system is stuck in the NAND gate state. To compensate for this, we
				decided to use the decay rate {IFormula("\\beta")} to reset the trails
				of our network.
				<Preview
					params={{
						title: "NOT & NAND",
						text: "Toggling between two gates with reset",
						name: "NOT/NAND",
					}}
				></Preview>
			</p>
			<blockquote>
				<p class="has-line-data" data-line-start="5" data-line-end="6">
					<img src={SwitchBImg} style={{ width: "100%" }} alt="NANDSwitchB" />
				</p>
			</blockquote>
			<p class="has-line-data" data-line-start="7" data-line-end="8">
				By increasing {IFormula("\\beta")} to 0.9 for a duration of 300 time
				steps when toggling the pivot node, we managed to successfully regain
				the NOT gate layout after the second transition.
			</p>
		</section>
	);
};

export default Analysis;
