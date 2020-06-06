// React imports
import React, { FunctionComponent } from "react";

interface SidebarProps {
	progressState: any;
}

/** Sidebar component. used in Body component at the side */
const Sidebar: FunctionComponent<SidebarProps> = (_props) => {
	return (
		<section className="sidebar">
			{JSON.stringify(_props)}
		</section>
	)
}

export default Sidebar;