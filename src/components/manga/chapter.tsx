// React imports
import React, { FunctionComponent, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { RouteProps } from "react-router-dom";

// Custom imports
import mangasee, { MangaData, loadingState as MangaLoadingState } from "./mangasee";
import MobileChapterNavigation from "./components/mobileChapterNavigation";

// Interfaces
interface ParamInterface extends RouteProps {
	slug?: string;
	chapter?: string;
	setProgressState: any;
}

// Main Chapters view
const Chapter: FunctionComponent<RouteComponentProps<ParamInterface>> = ({ match }) => {

	const [mangaData, setMangaData] = useState<MangaData>(MangaLoadingState);
	// If there is a slug, get the manga's date and set state
	useEffect(() => {
		let params = match.params;
		if(params.chapter && typeof params.chapter === "string") {
			let [index, chapter] = params.chapter.split("-");
			if(params?.slug) {
				// Get data
				mangasee(params.slug, {
					index: Number(index),
					chapter: Number(chapter)
				}).then(data => {
					// Compare data
					if(data.slug !== mangaData.slug) {
						console.log(data, mangaData);
						// Set data
						setMangaData(data);
					};
				});
			}
		}
	});

	// Reset X scrolling position for image viewer
	useEffect(() => {
		document.querySelector(".chapterImages")?.scrollTo(0, 0);
		document.querySelector(".chapterImages")?.addEventListener("scroll", () => {
			// Get all page elements
			let pages = Array.from(document.querySelectorAll(".chapterImages .page"));
			// Find one closest to the left side of the screen
			let focused = pages.reduce((closest, current) => {
				let curPos = current.getBoundingClientRect().left;
				if(!closest || Math.abs(curPos) < Math.abs(closest.getBoundingClientRect().left)) return current;
				return closest;
			}, document.querySelector(".chapterImages .page"));

			if(focused) {
				// Get index of focused element
				let pageIndex = pages.indexOf(focused) + 1;
				let percentage = pageIndex / pages.length;
				console.log(pageIndex, pages.length, Math.floor(percentage * 100) + "%");
				// setProgressState({
				// 	pageIndex,
				// 	pages
				// })
			}

		})
	});


	document.querySelector(".chapterImages")?.scrollTo(0, 0)

	// Return component (obviously)
	return (
		<div className="content contentFullWidth">
			<div className="chapterWrapper">
				<MobileChapterNavigation />
				<div className="chapterImages">
					{mangaData.current?.sources.map((src, i) => {
						return <img key={i} loading="lazy" className="page" src={src} alt={"Page " + (i + 1).toString()} />
					})}
				</div>
			</div>
		</div>
	)
}

export default Chapter;