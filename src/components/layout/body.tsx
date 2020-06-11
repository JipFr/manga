// React imports
import React, { FunctionComponent } from "react";
import { Route } from "react-router-dom";

// Component imports
import { SettingsProvider } from "../../util/settingsProvider";
import Sidebar from "../sidebar";
import Manga from "../manga";

/** Body component. used in Core component below the header */
const Body: FunctionComponent = (_props) => {

	return (
		<SettingsProvider>
			<aside className="sidebarWrapper">
				<Sidebar />
			</aside>
			<div className="contentWrapper">
				<Route exact path="/:slug" component={Manga.Chapters} />
				<Route exact path="/:slug/:chapter/" render={(props) => <Manga.Chapter {...props} />}  />
			</div>
		</SettingsProvider>
	)
}

export default Body;