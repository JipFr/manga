// React imports
import React, { FunctionComponent } from "react";
import { Route } from "react-router-dom";

// Component imports
import { SettingsProvider } from "../../util/settingsProvider";
import { StateWrapperProvider } from "../../util/generalStateWrapper";
import Sidebar from "../sidebar";
import DesktopSidebar from "../desktopSidebar";
import Manga from "../manga";

/** Body component. used in Core component below the header */
const Body: FunctionComponent = (_props) => {

	return (
		<SettingsProvider>
			<StateWrapperProvider>
				<aside className="sidebarWrapper">
					<DesktopSidebar />
					<Sidebar />
				</aside>
				<div className="contentWrapper">
					<Route exact path="/">
						<p style={{margin: "80px 0"}}>Home page</p>
					</Route>
					<Route exact path="/:slug" component={Manga.Chapters} />
					<Route exact path="/:slug/:chapter/" render={(props) => <Manga.Chapter {...props} />}  />
				</div>
			</StateWrapperProvider>
		</SettingsProvider>
	)
}

export default Body;