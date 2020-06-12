// React imports
import React, { FunctionComponent, useContext } from "react";
import { Link } from "react-router-dom";

// Custom imports
import { StateContext } from "../util/generalStateWrapper"

// Main component
const DesktopSidebar: FunctionComponent = (_props) => {

	let { wrapperState } = useContext(StateContext);

	const setLoadState = () => {
		// let tmp = mangaData.data;
		// tmp.current.sources = [];
		// tmp.loading = true;
		// mangaData.set(tmp);
	}

	let nextButton = <div></div>;
	let previousButton = <div></div>;
	
	if(wrapperState.navigationLinks) {
		let { nextChapter, previousChapter } = wrapperState.navigationLinks;
		if(nextChapter) {
			nextButton = (
				<Link onClick={setLoadState} className="chapterQuickLink nextLink" to={nextChapter.slug}>
					<span>Chapter {nextChapter.chapter}</span>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
				</Link>
			)
		}
		if(previousChapter) {
			previousButton = (
				<Link onClick={setLoadState} className="chapterQuickLink previousLink" to={previousChapter.slug}>
					<span>Chapter {previousChapter.chapter}</span>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
				</Link>
			)
		}
	}

	return (
		<div className="desktopSidebar">
			<div className="sideProgress">
				{wrapperState.progress ? <div className="pageProgress">
					Page {wrapperState.progress.page} of {wrapperState.progress.of}
				</div> : ""}
				<div className="sideNavigation">
					{previousButton}
					{nextButton}
				</div>
			</div>
		</div>
	)
}

export default DesktopSidebar;