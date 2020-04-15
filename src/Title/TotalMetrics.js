import React from "react";
import GitHubButton from "react-github-btn";

const TotalMetrics = () => {
	return (
		<div className="total-metrics">
			<div className="ant-metric">
				<div className="ant-text">by Jordi Campos</div>
			</div>
			<div className="buttons" style={{ marginTop: ".7rem" }}>
				<GitHubButton
					href="https://github.com/c-jordi/Antwork"
					data-icon="octicon-star"
					aria-label="Star c-jordi/Antwork on GitHub"
				>
					Star
				</GitHubButton>
				<GitHubButton
					href="https://github.com/c-jordi"
					aria-label="Follow @c-jordi on GitHub"
				>
					Follow @c-jordi
				</GitHubButton>
			</div>
		</div>
	);
};

export default TotalMetrics;
