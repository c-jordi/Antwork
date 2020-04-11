import React, { createContext, useState } from "react";

export const statsContext = createContext();

export const StatsContextProvider = ({ children }) => {
	const [stats, setStats] = useState({ counter: 0 });

	const updateStats = controller => {
		setStats({
			counter: controller.engine.counter,
			running: controller.engine.running,
			connectivity: controller.analysis.database.connectivity,
			numberOfAnts: controller.walkers.numberOfAgents
		});
	};
	return (
		<statsContext.Provider value={{ stats, updateStats }}>
			{children}
		</statsContext.Provider>
	);
};
