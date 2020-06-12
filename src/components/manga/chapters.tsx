// React imports
import React, { FunctionComponent, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";

// Custom imports
import mangasee, { MangaData, loadingState as MangaLoadingState } from "./mangasee";
import ChapterLink from "./components/chapterLink";

// Interfaces
interface ParamInterface {
	slug?: string
}

// Main Chapters view
const Chapters: FunctionComponent<RouteComponentProps<ParamInterface>> = ({ match }) => {

	const [mangaData, setMangaData] = useState<MangaData>(MangaLoadingState);
	// If there is a slug, get the manga's date and set state
	useEffect(() => {
		let params = match.params;
		if(params?.slug) {
			// Get data
			mangasee(params.slug).then(data => {
				// Compare data
				if(data.slug !== mangaData.slug) {
					console.log(data.slug, mangaData);
					setMangaData(data)
				};
			});
		}
	});

	// Change div based on its loading state
	let mainDiv;
	if(!mangaData.loading) {
		
		let DescriptionDiv = mangaData.description ? (
			<p className="description fwDoPadding">{mangaData.description}</p>
		) : <></>;

		let chaptersDiv = <></>;
		if(mangaData.chapters.length > 0) {
			chaptersDiv = (
				<div className="chapters">
					{mangaData.chapters.map(chapter => {
						return <ChapterLink label={chapter.label} slug={chapter.slug} key={chapter.label} />
					})}
				</div>
			)
		}

		mainDiv = (
			<section className="isManga mangaDetails">
				<div className="contentCard small fwDoPadding">
					<img className="mangaPoster" alt="Poster" src={mangaData.poster ?? "https://mvlist.jipfr.nl/assets/poster.png"} />
					<div className="mangaInfoText">
						<h1 className="title">{mangaData.title}</h1>
						{DescriptionDiv}
					</div>
				</div>
				<div className="contentCard mobileUndoBorder mobileUndoPadding">
					<div className="mangaInfoTop">
						{DescriptionDiv}
					</div>
					{chaptersDiv}
				</div>
			</section>
		)
	}

	// Return component (obviously)
	return (
		<div className="content">{mainDiv ?? MangaLoadingState.title}</div>
	)
}

export default Chapters;