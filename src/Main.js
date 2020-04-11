import React, { Component } from "react";
import Display from "./Display";
import InfoBar from "./InfoBar";

class Main extends Component {
	constructor() {
		super();
		this.state = { screenWidth: null };
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateWindowDimensions());
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ screenWidth: window.innerWidth });
	}

	render() {
		return (
			<div className="main">
				<InfoBar></InfoBar>
				<Display></Display>
			</div>
		);
	}
}

export default Main;
