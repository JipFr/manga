// React import
import React, { FunctionComponent, useState, useEffect } from "react";

// Configure settings context
interface Settings {
	horizontalReader: boolean;
	[key: string]: any;
}
interface ContextType {
	settings: Settings,
	setSetting: (key: string, value: any) => void
}
const defaultSettings: Settings = {
	horizontalReader: true
}
const settingsContext = React.createContext<ContextType>({
	settings: defaultSettings,
	setSetting: () => {}
});

// Main components
const SettingsProvider: FunctionComponent = ({ children }) => {

	let usableSettings = defaultSettings;
	try {
		let ls = localStorage.getItem("readerSettings");
		if(ls) {
			usableSettings = {
				...usableSettings,
				...JSON.parse(ls)
			}
		}
	} catch(e) {
		// Nothing for now...
	}

	let [settings, setSettingFunction] = useState<any>(usableSettings);

	let setSetting = (key: string, value: any) => {
		setSettingFunction({
			[key]: value
		});
	}

	useEffect(() => {
		// Store settings
		localStorage.setItem("readerSettings", JSON.stringify(settings));
	});
	
	return (
		<settingsContext.Provider value={{settings, setSetting}}>
			{children}
		</settingsContext.Provider>
	)
}

// Export values
export {
	settingsContext,
	SettingsProvider
}