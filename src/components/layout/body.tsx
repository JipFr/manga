// React imports
import React, { FunctionComponent } from "react";

// Component imports
import Sidebar from "../sidebar";

/** Body component. used in Core component below the header */
const Body: FunctionComponent = (_props) => {
	return (
		<>
			<Sidebar />
			<div className="contentWrapper">
				<div className="content">
					:)
				</div>
			</div>
		</>
	)
}

export default Body;