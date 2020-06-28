// React imports
import React, { FunctionComponent, useState, useEffect, useContext } from "react";
import { RouteComponentProps } from "react-router";

// Custom imports
import { settingsContext } from "../../util/settingsProvider";
import { StateContext } from "../../util/generalStateWrapper";
import mangasee, { MangaData, loadingState as MangaLoadingState } from "./mangasee";
import MobileChapterNavigation from "./components/mobileChapterNavigation";
import ReaderControls from "./components/readerControls";

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
	let { setWrapperState } = useContext(StateContext);

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

						setWrapperState({
							manga: data
						});

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
	let manga = {
		set: setMangaData,
		data: mangaData
	}

	// Final component return
	return (
		<settingsContext.Consumer>
			{({ settings }) => {
				// `settings` come from the ctx value
				let horizontalReader = !!settings.horizontalReader;
				let invertImages = !!settings.invertImages;
				let imageMaxHeight = !!settings.imageMaxHeight;
				let hideGap = !!settings.hideReaderGap;

				// Define imagesdiv
				let imagesDiv = (
					<>
						{mangaData.current?.sources.map((src, i) => {
							return <img key={i} loading="lazy" className={`page ${imageMaxHeight ? "noMaxHeight" : ""}`.trim()} src={src} alt={"Page " + (i + 1).toString()} />
						})}
					</>	
				)
				if(mangaData.current?.sources.length === 0) {
					// Empty state handler
					imagesDiv = (
						<div className="empty">
							No sources were found for this chapter.
						</div>
					)
				}

				console.log(invertImages);
				return (
					<>
						<MobileChapterNavigation isHorizontal={horizontalReader} mangaData={manga} nextChapter={nextChapter} previousChapter={previousChapter} />
						<div className="content contentFullWidth">
							<div className="chapterWrapper" data-hide-gap={hideGap} data-horizontal={horizontalReader} data-invert-images={invertImages}>
								<ReaderControls />
								<div className={"chapterImages" + (mangaData.current?.sources.length === 0 ? " loading" : "")}>
									{mangaData.loading ? <div className="loading">
										<svg width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="#2999fb" strokeWidth="2" r="8" strokeDasharray="37.69911184307752 14.566370614359172" transform="rotate(126.259 50 50)"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></circle></svg>
									</div> : imagesDiv}
								</div>
							</div>
						</div>
					</>
				)
			}}
		</settingsContext.Consumer>
	)
}

export default Chapter;