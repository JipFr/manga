// React imports
import React, { FunctionComponent, useContext } from "react";

// Custom imports
import { StateContext } from "../util/generalStateWrapper"

// Main component
const DesktopSidebar: FunctionComponent = (_props) => {

	let { wrapperState } = useContext(StateContext);
	console.log(wrapperState);

	return (
		<div className="desktopSidebar">
			<div className="sideProgress">
				{JSON.stringify(wrapperState)}
			</div>
		</div>
	)
}

export default DesktopSidebar;