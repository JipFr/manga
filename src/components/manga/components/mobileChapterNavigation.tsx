
// React imports
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

// SCSS imports
import "../../../scss/layout/_mobileChapterNav.scss";

// Custom imports
import { Chapter } from "../mangasee";

// Component
const MobileChapterNavigation: FunctionComponent<{
	nextChapter: Chapter | null,
	previousChapter: Chapter | null
}> = ({ nextChapter, previousChapter }) => {

	let nextButton = <></>;
	let previousButton = <></>;
	if(nextChapter) {
		nextButton = (
			<Link className="chapterQuickLink nextLink" to={nextChapter.slug}>
				<span>Chapter {nextChapter.chapter}</span>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
			</Link>
		)
	}
	if(previousChapter) {
		previousButton = (
			<Link className="chapterQuickLink previousLink" to={previousChapter.slug}>
				<span>Chapter {previousChapter.chapter}</span>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
			</Link>
		)
	}

	return (
		<nav className="mobileChapterNav">
			{previousButton}
			{nextButton}
		</nav>
	)
}

export default MobileChapterNavigation;