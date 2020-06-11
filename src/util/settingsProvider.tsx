// React import
import React, { FunctionComponent, useState, useEffect, useContext } from "react";

// Configure settings context
interface Settings {
	horizontalReader: boolean;
	[key: string]: any;
}
const defaultSettings: Settings = {
	horizontalReader: true,
	i: 1
}
const settingsContext = React.createContext<[any, any]>([defaultSettings, () => {}]);

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
		localStorage.setItem("readerSettings", JSON.stringify(settings));
	}
	
	return (
		<settingsContext.Provider value={[settings, setSetting]}>
			{children}
		</settingsContext.Provider>
	)
}

// Export values
export {
	settingsContext,
	SettingsProvider
}