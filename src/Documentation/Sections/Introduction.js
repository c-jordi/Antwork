import React from "react";

const Introduction = () => {
	return (
		<section className="introduction">
			<h1 class="code-line" data-line-start="0" data-line-end="1">
				Introduction
			</h1>
			<p class="has-line-data" data-line-start="1" data-line-end="2"></p>
			<p className="has-line-data" data-line-start="0" data-line-end="1">
				The goal of this semester project is to provide a first attempt at
				connecting two research domains in the hope of performing computation on
				self assembling networks[1]. In this project, the networks will be
				generated with the use of Active Brownian Agents[2]. The dynamics of
				these brownian agents will lead to the generation of networks of trails
				between predefined nodes. To perform computation, this agent based
				modelling framework will then be combined with an Active matter logic
				model[3] developped by Woodhouse and Dunkel.
			</p>
		</section>
	);
};

export default Introduction;
