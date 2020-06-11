// React imports
import React, { FunctionComponent } from "react";

// Custom imports
import { settingsContext } from "../../../util/settingsProvider";

// SCSS imports
import "../../../scss/_readerControls.scss";

// Interfaces
interface ReaderControlsProps {
	
}

// Components
const ReaderControls: FunctionComponent<ReaderControlsProps> = (_props) => {
	return (
		<settingsContext.Consumer>
			{ReaderControlsInner}
		</settingsContext.Consumer>
	)
}

function ReaderControlsInner(ctx: any) {
	let { settings, setSetting } = ctx;

	const toggleHorizontal = (e: any) => {
		window.scrollTo(0, 0);
		setSetting("horizontalReader", e.target.checked);
	}

	const toggleImageInvert = (e: any) => {
		setSetting("invertImages", e.target.checked);
	}

	return (
		<div className="readerControls contentCard mobileUndoBorder">
			<h2 className="title">Settings</h2>
			<div className="settingsDiv">
				<input checked={settings.horizontalReader} onChange={toggleHorizontal} type="checkbox" id="horizontalReader" />
				<label>Horizontal reader</label>
			</div>
			<div className="settingsDiv">
				<input checked={settings.invertImages} onChange={toggleImageInvert} type="checkbox" id="invertImages" />
				<label>Invert images in dark mode</label>
			</div>
		</div>
	)
}

export default ReaderControls;
