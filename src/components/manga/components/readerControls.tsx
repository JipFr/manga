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
			{ctx => {
				let [settings, setSetting] = ctx;

				const toggleHorizontal = (e:any) => {
					setSetting("horizontalReader", e.target.checked);
				}

				return (
					<div className="readerControls contentCard mobileUndoBorder">
						Controls
						<div className="settingsDiv">
							<input checked={settings.horizontalReader} onChange={toggleHorizontal} type="checkbox" id="horizontalReader" />
							<label>Horizontal reader</label>
						</div>
					</div>
				)
			}}
		</settingsContext.Consumer>
	)
}

export default ReaderControls;
