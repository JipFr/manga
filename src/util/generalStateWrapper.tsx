// React import
import React, { FunctionComponent, useState } from "react";

// Configure context
interface AnyObj {
	[key: string]: any;
}
interface ContextType {
	wrapperState: AnyObj;
	setWrapperState: (newKeys: AnyObj) => void
}
const StateContext = React.createContext<ContextType>({
	wrapperState: {},
	setWrapperState: (newKeys: AnyObj) => {}
});

// Main components
const StateWrapperProvider: FunctionComponent = ({ children }) => {

	let [wrapperState, setWrapperStateFunction] = useState({});

	let setWrapperState = (newKeys: AnyObj) => {
		let newObj = {
			...wrapperState,
			...newKeys
		}
		setWrapperStateFunction(newObj);
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