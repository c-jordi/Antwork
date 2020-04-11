import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./Header.css";
import ControlBar from "../ControlBar";

const Header = () => {
	return (
		<div className="header">
			<div className="icon">
				<span role="img" aria-label="Antwork">
					🐜
				</span>
			</div>
			<nav>
				<div>
					<Link className="page" to="/">
						Home
					</Link>
				</div>
				<div>
					<Link className="page" to="/about">
						About
					</Link>
				</div>
			</nav>
			<div className="control-container">
				<ControlBar Link={Link}></ControlBar>
			</div>
		</div>
	);
};

export default Header;
