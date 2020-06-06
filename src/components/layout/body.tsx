// React imports
import React, { FunctionComponent, useState } from "react";
import { Route } from "react-router-dom";

// Component imports
import Sidebar from "../sidebar";
import Manga from "../manga";

/** Body component. used in Core component below the header */
const Body: FunctionComponent = (_props) => {

	let [progressState, setProgressState] = useState({});

	return (
		<>
			<aside className="sidebarWrapper">
				<Sidebar progressState={progressState} />
			</aside>
			<div className="contentWrapper">
				<Route exact path="/:slug" component={Manga.Chapters} />
				<Route exact path="/:slug/:chapter/" render={(props) => <Manga.Chapter {...props} setProgressState={setProgressState} />}  />
			</div>
		</>
	)
}

export default Body;