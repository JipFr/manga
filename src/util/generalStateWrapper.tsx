// React import
import React, { FunctionComponent, useState } from "react";

// Configure context
const StateContext = React.createContext({});

// Main components
const StateWrapperProvider: FunctionComponent = ({ children }) => {

	let [wrapperState, setWrapperStateFunction] = useState({});

	let setWrapperState = (newKeys: {
		[key: string]: any
	}) => {
		setWrapperStateFunction({
			...wrapperState,
			...newKeys
		});
	}
	
	return (
		<StateContext.Provider value={{wrapperState, setWrapperState}}>
			{children}
		</StateContext.Provider>
	)
}

// Export values
export {
	StateContext,
	StateWrapperProvider
}