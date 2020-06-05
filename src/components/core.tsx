
// React imports
import React, { FunctionComponent } from "react";
import { 
	BrowserRouter as Router
} from "react-router-dom";

// Component imports
import Header from "./layout/header";
import Body from "./layout/body";

/** Core component. Wrapper for all elements*/
const Core: FunctionComponent = (_props) => {

	return (
		<Router>
			<Header />
			<div className="bodyWrapper mainLayout">
				<Body />
			</div>
		</Router>
	)
}

export default Core;