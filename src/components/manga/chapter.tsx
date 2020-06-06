// React imports
import React, { FunctionComponent, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";

// Custom imports
import mangasee, { MangaData, loadingState as MangaLoadingState } from "./mangasee";
// Interfaces
interface ParamInterface {
	slug?: string;
	chapter?: string;
}

// Main Chapters view
const Chapter: FunctionComponent<RouteComponentProps<ParamInterface>> = (_props) => {

	let { match } = _props;

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
	});


	document.querySelector(".chapterImages")?.scrollTo(0, 0)

	// Return component (obviously)
	return (
		<div className="content contentFullWidth">
			<div className="chapterWrapper">
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