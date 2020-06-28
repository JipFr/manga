// React imports
import React, { FunctionComponent, ChangeEvent } from "react";

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

	const toggleHorizontal = (e: ChangeEvent<HTMLInputElement>) => {
		window.scrollTo(0, 0);
		setSetting("horizontalReader", e.target.checked);
	}

	const toggleImageInvert = (e: ChangeEvent<HTMLInputElement>) => {
		setSetting("invertImages", e.target.checked);
	}

	const toggleMaxHeight = (e: ChangeEvent<HTMLInputElement>) => {
		setSetting("imageMaxHeight", e.target.checked);
	}

	const toggleReaderGap = (e: ChangeEvent<HTMLInputElement>) => {
		setSetting("hideReaderGap", e.target.checked);
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
			<div className="settingsDiv">
				<input checked={settings.imageMaxHeight} onChange={toggleMaxHeight} type="checkbox" id="imageMaxHeight" />
				<label>Don't fit image on screen</label>
			</div>
			<div className="settingsDiv">
				<input checked={settings.hideReaderGap} onChange={toggleReaderGap} type="checkbox" id="readerGap" />
				<label>Hide gap in vertical reader</label>
			</div>
		</div>
	)
}

export default ReaderControls;
