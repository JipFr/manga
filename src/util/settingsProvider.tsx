// React import
import React, { FunctionComponent } from "react";

// Configure settings context
interface Settings {
	horizontalReader: boolean;
	[key: string]: any;
}
const defaultSettings: Settings = {
	horizontalReader: true,
	i: 1
}
const settingsContext = React.createContext(defaultSettings);
let settings = defaultSettings;
try {
	let ls = localStorage.getItem("readerSettings");
	if(ls) {
		settings = {
			...settings,
			...JSON.parse(ls)
		};
	} else {
		settings = defaultSettings;
	}
} catch(e) {
	// :/
	settings = defaultSettings;
}

/**
 * Update field in settings
 */
settings.updateSetting = (key: string, value: any) => {
	settings[key] = value;
	localStorage.setItem("readerSettings", JSON.stringify(settings));
}

setInterval(() => {
	settings.updateSetting("i", settings.i + 1);
}, 2e3);

localStorage.setItem("readerSettings", JSON.stringify(settings));

// Main components
const SettingsProvider: FunctionComponent = ({ children }) => {
	
	return (
		<settingsContext.Provider value={settings}>
			{children}
		</settingsContext.Provider>
	)
}

// Export values
export {
	settingsContext,
	SettingsProvider
}