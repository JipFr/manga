// React imports
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

// SCSS imports
import "../../../scss/_readerControls.scss";

// Interfaces
interface ReaderControlsProps {
	
}

// Components
const ReaderControls: FunctionComponent<ReaderControlsProps> = (_props) => {
	return (
		<div className="readerControls contentCard mobileUndoBorder">
			Controls
		</div>
	)
}

export default ReaderControls;
