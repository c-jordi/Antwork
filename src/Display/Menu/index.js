import React from "react";

export const MenuContainer = ({ children, className }) => {
	return <div className={"menu-container " + className}>{children}</div>;
};

export const MenuItem = ({ text, icon, alt, menuClick, window, isActive }) => {
	return (
		<div
			className={"menu-item " + (isActive(window) ? "active" : "")}
			onClick={() => menuClick(window)}
		>
			{text && <div>{text}</div>}

			{icon && <img alt={alt} src={icon} width="20px"></img>}
		</div>
	);
};
