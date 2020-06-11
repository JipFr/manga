// React imports
import React, { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// SCSS imports
import "../../../scss/layout/_mobileChapterNav.scss";

// Custom imports
import { Chapter } from "../mangasee";
import { ProgressData } from "../chapter";

// Component
const MobileChapterNavigation: FunctionComponent<{
	nextChapter: Chapter | null,
	previousChapter: Chapter | null,
	mangaData: any,
	isHorizontal: boolean
}> = ({ nextChapter, previousChapter, mangaData, isHorizontal }) => {

	const [progress, setProgress] = useState<ProgressData>({
		page: 0,
		of: 0
	});

	const setLoadState = () => {
		let tmp = mangaData.data;
		tmp.current.sources = [];
		mangaData.set(tmp);
	}

	let nextButton = <div></div>;
	let previousButton = <div></div>;
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

	const updatePages = () => {
		// Get all page elements
		let pages = Array.from(document.querySelectorAll(".chapterImages .page"));
		// Find one closest to the left side of the screen
		let focused = pages.reduce((closest, current) => {
			
			if(closest) {
				let curPos =  isHorizontal ? current.getBoundingClientRect().left : current.getBoundingClientRect().top;
				let closestPos = isHorizontal ? closest.getBoundingClientRect().left : closest.getBoundingClientRect().top;
				console.log(curPos);
				if(!closest || Math.abs(curPos) < Math.abs(closestPos ?? 0)) return current;
			}
			return closest;

		}, document.querySelector(".chapterImages .page"));

		if(focused) {
			// Get index of focused element
			let pageIndex = pages.indexOf(focused) + 1;
			// let percentage = pageIndex / pages.length;
			// console.log(pageIndex, pages.length, Math.floor(percentage * 100) + "%");
			if(progress.page !== pageIndex || progress.of !== pages.length) {
				// Now debounce time out to set state
				setProgress({
					page: pageIndex,
					of: pages.length
				});
			}
		}

	}

	useEffect(updatePages);
	useEffect(() => {
		// Update page counter
		let debounceScroll: NodeJS.Timeout | undefined;
		let runScrollDebounce = () => {
			if(debounceScroll) {
				clearTimeout(debounceScroll);
				debounceScroll = undefined;
			}

			debounceScroll = setTimeout(() => {
				updatePages();
			}, 50);

		}
		if(isHorizontal) {
			document.querySelector(".chapterImages")?.addEventListener("scroll", runScrollDebounce);
		} else {
			document.addEventListener("scroll", runScrollDebounce);
		}
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<nav className="mobileChapterNav">
			{previousButton}
			<span>{progress.page} of {progress.of}</span>
			{nextButton}
		</nav>
	)
}

export default MobileChapterNavigation;