import React from "react";
import { SimulationContextProvider } from "./Simulation/context/SimulationContext";
import { StatsContextProvider } from "./Simulation/context/StatsContext";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header.js";
import About from "./About";
import Main from "./Main";
import Footer from "./Footer";

function App() {
	return (
		<div className="App">
			<SimulationContextProvider>
				<StatsContextProvider>
					<Router>
						<Header></Header>
						<Switch>
							<Route path="/about">
								<About></About>
							</Route>
							<Route path="/">
								<Main></Main>
							</Route>
						</Switch>
						<Footer></Footer>
					</Router>
				</StatsContextProvider>
			</SimulationContextProvider>
		</div>
	);
}

export default App;
