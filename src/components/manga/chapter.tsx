// React imports
import React, { FunctionComponent, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";

// Custom imports
import mangasee, { MangaData, loadingState as MangaLoadingState } from "./mangasee";
import MobileChapterNavigation from "./components/mobileChapterNavigation";

// Interfaces
interface ParamInterface {
	slug?: string;
	chapter?: string;
}
export interface ProgressData {
	page: number;
	of: number;
}

// Main Chapters view
const Chapter: FunctionComponent<RouteComponentProps<ParamInterface>>  = ({ match }) => {

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
					if(data.slug !== mangaData.slug || data.current?.chapter !== mangaData.current?.chapter) {
						// Set data
						setMangaData(data);
						// Reset X scrolling position for image viewer
						document.querySelector(".chapterImages")?.scrollTo(0, 0);
					};
				});
			}
		}
	});

	let { current, chapters } = mangaData;
	// Get next chapter for navigation
	let nextChapter = chapters.find(obj => obj.chapter === (current?.chapter || 0) + 1 && obj.index === current?.index) ?? null;
	if(!nextChapter) nextChapter = chapters.find(obj => obj.index === (current?.index || 0) + 1) ?? null;

	// Get previous chapter for navigation
	let previousChapter = chapters.find(obj => obj.chapter === (current?.chapter || 0) - 1 && obj.index === current?.index) ?? null;
	// Array is reversed because it is iniatally sorted from smallest to greatest.
	// We want the reverse of that.
	if(!previousChapter) previousChapter = chapters.reverse().find(obj => obj.index === (current?.index || 0) - 1) ?? null;

	// Return component (obviously)
	return (
		<div className="content contentFullWidth">
			<div className="chapterWrapper">
				<MobileChapterNavigation nextChapter={nextChapter} previousChapter={previousChapter} />
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