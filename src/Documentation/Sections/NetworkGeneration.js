import React from "react";
import { Formula, IFormula } from "./Formula";
import Preview from "../Preview";
import Fig1 from "../Ressources/fig1.svg";
import Fig2 from "../Ressources/fig2.svg";

const NetworkGeneration = () => {
	return (
		<section className="network-generation">
			<h1 className="code-line" data-line-start="0" data-line-end="1">
				Network Generation
			</h1>
			<p className="has-line-data" data-line-start="0" data-line-end="1">
				The network generation is performed by Brownian Agents that are capable
				of locally modifying and responding to an information field. In the case
				of a chemical field, the formation of trails is made possible by the
				interplay of two processes:
			</p>
			<ol>
				<li className="has-line-data" data-line-start="1" data-line-end="2">
					The generation of gradients in the chemical field through localized
					depositing of the agents
				</li>
				<li className="has-line-data" data-line-start="2" data-line-end="3">
					The nonlinear response of the agents to the chemical gradients
					(chemotaxis)
				</li>
			</ol>
			<p className="has-line-data" data-line-start="5" data-line-end="6">
				Each browniant agent i is characterized by the following state
				variables: its position {IFormula("r_i")}, its velocity{" "}
				{IFormula("v_i")} and an internal parameters {IFormula("\\theta_i")} and{" "}
				{IFormula("e_i")}. The internal parameter {IFormula("\\theta_i")} is
				akin to a polarity and can assume one of three values: {IFormula("-1")},
				{IFormula("0")} or {IFormula("1")}. The parameter {IFormula("e_i")} is
				the internal energy depot and powers the internal and external state
				changes.
			</p>
			<blockquote>
				<p className="has-line-data" data-line-start="6" data-line-end="7">
					<img src={Fig1} style={{ width: "100%" }} alt="Fig1" />
				</p>
			</blockquote>
			<p className="has-line-data" data-line-start="8" data-line-end="9">
				Over the course of time, these state variable evolve deterministically
				and stochastically under the influence of the environment and other
				brownian agents.
			</p>
			<p className="has-line-data" data-line-start="10" data-line-end="11">
				The change of position of the brownian agents is described by an
				overdamped Langevin Equation.
			</p>
			<blockquote>
				<p
					className="has-line-data"
					data-line-start="12"
					data-line-end="13"
					style={{ fontSize: "min(3vw,15px)" }}
				>
					{Formula(
						"\\frac{dr_i}{dt} = \\alpha_i \\frac{\\partial h^e(r,t)}{\\partial r}|_{r_i,\\theta_i} + \\sqrt{2 \\epsilon_i} \\xi_i(t)"
					)}
				</p>
			</blockquote>
			<p className="has-line-data" data-line-start="14" data-line-end="15">
				The first term corresponds to the contribution of the gradient of the
				effective field {IFormula("h^e")}, weighted by {IFormula("\\alpha_i")},
				the strength of the individual response to the strength of the field.
				The parameter {IFormula("\\alpha_i")} can either be positive for an
				attractive response or negative for a responsive response to the field.
				The second term contains the effect of noise on the motion of the agent.
				The noise {IFormula("\\xi_i(t)")} is fully stochastic and is weighted by{" "}
				{IFormula("\\epsilon_i")}, which is the inverse of the individual
				sensitivity {IFormula("w_i \\propto \\frac{1}{\\epsilon}")}
				of the agent.
			</p>
			<blockquote>
				<p className="has-line-data" data-line-start="16" data-line-end="17">
					<img src={Fig2} style={{ width: "100%" }} alt="Fig2" />
				</p>
			</blockquote>
			<p class="has-line-data" data-line-start="0" data-line-end="1">
				In addition to the dynamical parameters, the parameter{" "}
				{IFormula("\\theta_i\\in{{-1,0,1}}")} can evolve over time. For every
				agent, it initially assumes the value {IFormula("\\theta(t_0)=0")}. When
				an agent comes in contact with a node, the agent will assume the
				polarity of the node.
			</p>
			<blockquote>
				<p
					class="has-line-data"
					data-line-start="2"
					data-line-end="3"
					style={{ fontSize: "min(3vw,15px)" }}
				>
					{Formula(
						"\\Delta\\theta_i(t) = \\int_A \\sum\\limits_{j=1}^z (V_j - \\theta_i) \\frac{1}{A}\\delta(r_j^z - r_i(t))dr"
					)}
				</p>
			</blockquote>
			<p class="has-line-data" data-line-start="4" data-line-end="5">
				The agents move around in a 2d plane of size {IFormula("A")} that
				contains {IFormula("z")} nodes of polarity {IFormula("V_j=\\pm1")} with{" "}
				{IFormula("j=1,…,z")}. Furthermore, {IFormula("z_+")} nodes have a
				positive polarity of {IFormula("V_j=+1")} and {IFormula("z_-=z-z_+")}{" "}
				have a negative potential {IFormula("V_j=-1")}. These nodes do not have
				long range effects on the agents and only interact with them once in
				contact.
			</p>
			<p class="has-line-data" data-line-start="6" data-line-end="7">
				<Preview
					params={{
						title: "hello world",
						text: "Slowed down simulation to understand the dynamics",
						name: "helloworld",
					}}
				></Preview>
			</p>
			<p class="has-line-data" data-line-start="8" data-line-end="9">
				Agents that are in the active state (which have recently undergone a
				collision with a node), are able to produce either a {IFormula("(+1)")}{" "}
				or {IFormula("(-1)")} chemical. An agent that has a positive internal
				polarity {IFormula("\\theta_i=1")} will be producing a positive
				chemical. An agent with a negative internal polarity{" "}
				{IFormula("\\theta_i=-1")} will be producing a negative chemical. An
				agent with internal polarity {IFormula("\\theta_i=0")} is not producing
				any chemical. The agent’s rate of chemical production{" "}
				{IFormula("s_i(\\theta_i,t)")} depends on the time since his last
				collision, the initial production rate and the decay in the production
				rate.
			</p>

			<p
				class="has-line-data"
				data-line-start="10"
				data-line-end="11"
				style={{ fontSize: "min(2vw,15px)" }}
			>
				{Formula(
					"s_i( \\theta_i,t) = \\frac{\\theta_i}{2} [ ( 1+\\theta_i)s_{+1}^0 exp(-\\beta_{+1}(t-t^i_{n+})) - (1-\\theta_i)s^0_{-1}exp(-\\beta_{-1}(t-t^i_{n-}))]"
				)}
			</p>

			<p class="has-line-data" data-line-start="12" data-line-end="13">
				The initial production rates are given by {IFormula("s_{+1}^0")} and{" "}
				{IFormula("s_{-1}^0")} for agents with positive and negative polarities
				respectively. The exponential decay parameters in the production rate
				are given by {IFormula("\\beta_{+1}")} and {IFormula("\\beta_{-1}")}. In
				our implementation, the values of these parameters don’t differ for
				positive and negative chemicals.
			</p>
			<p class="has-line-data" data-line-start="14" data-line-end="15">
				The spatio-temporal distribution of the chemicals is decribed by the
				chemical field {IFormula("h_{\\theta}(r,t)")} for{" "}
				{IFormula("\\theta = \\pm 1")} given by:
			</p>
			<blockquote>
				<p
					class="has-line-data"
					data-line-start="16"
					data-line-end="17"
					style={{ fontSize: "min(2.3vw,15px)" }}
				>
					{Formula(
						"\\frac{\\partial h_{\\theta}(r,t)}{\\partial t} = - k_{\\theta}h_{\\theta}(r,t) + \\sum\\limits_{i=1}^{N}s_i(\\theta_i,t)\\delta_{\\theta;\\theta_i}\\delta(r-r_i(t))"
					)}
				</p>
			</blockquote>
			<p class="has-line-data" data-line-start="18" data-line-end="19">
				The first term relates to the exponential decay of the chemical
				concentration through spontaneous decomposition. Its rate is given by{" "}
				{IFormula("k_{\\theta}")}. The second term indicates that the agents
				only contribute to the field of equal polarity by locally depositing a
				chemical concentration, that varies over time.
			</p>
			<p class="has-line-data" data-line-start="20" data-line-end="21">
				The effective field {IFormula("h^e(r,t)")} is made from the combination
				of both fields in the following manner:
			</p>
			<blockquote>
				<p
					class="has-line-data"
					data-line-start="21"
					data-line-end="22"
					style={{ fontSize: "min(2.5vw,15px)" }}
				>
					{Formula(
						"\\frac{\\partial h^{e}(r,t)}{\\partial r} = \\frac{\\theta_i}{2}[(1+\\theta_i)\\frac{\\partial h_{-1}(r,t)}{\\partial r} - (1-\\theta_i)\\frac{\\partial h_{+1}(r,t)}{\\partial r}]"
					)}
				</p>
			</blockquote>
			<p class="has-line-data" data-line-start="23" data-line-end="24">
				Combining everything, one can see that agents that are not active (ie{" "}
				{IFormula("\\theta=0")}) do not interact with the chemical field. Active
				agents are propolled by the gradient field of the opposite polarity and
				deposit chemicals in the field of same polarity.
			</p>
			<p class="has-line-data" data-line-start="25" data-line-end="27">
				To establish the network of trails, we sum the two individuals chemical
				fields and form a combined field {IFormula("\\hat{h}(r,t)")}.<br />
				The network of trails is observed by suming the two
			</p>
			<blockquote>
				<p class="has-line-data" data-line-start="27" data-line-end="28">
					{Formula("\\hat{h}(r,t) = h_{+1}(r,t) + h_{-1}(r,t)")}
				</p>
			</blockquote>
			<p class="has-line-data" data-line-start="29" data-line-end="30">
				For two nodes to be connected, there must exist at least one path
				between the two nodes along which the value of the combined field is
				above a imposed cutoff value {IFormula("h_{cut}")}.
			</p>
			<blockquote>
				<p class="has-line-data" data-line-start="31" data-line-end="32">
					{Formula("E_{kl}(t)=E_{lk}(t) = 1")} at time {IFormula("t")} if{" "}
					{IFormula("\\hat{h}(\\gamma,t)>h_{cut}")} for {IFormula("\\gamma")} a
					path in {IFormula("A")}
				</p>
			</blockquote>
		</section>
	);
};

export default NetworkGeneration;
