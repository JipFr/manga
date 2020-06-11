// React import
import React, { FunctionComponent, useState } from "react";

// Configure context
interface ContextType {
	wrapperState: {
		[key: string]: any;
	};
	setWrapperState: (newKeys: {
		[key: string]: any
	}) => void
}
const StateContext = React.createContext<ContextType>({
	wrapperState: {},
	setWrapperState: (newKeys: {
		[key: string]: any
	}) => {}
});

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