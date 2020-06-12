
// Interfaces
export interface Chapter {
	/** Assigned datatime on mangasee */
	datetime: string;
	/** Label, for example "Chapter 1" */
	label: string;
	/** Slug, for example /Fire-Brigade-Of-Flames/1-0/ */
	slug: string;
	/** Current chapter index. For example, 1 */
	chapter: number;
	/** Current chapter's season */
	index: number;
	/** Combined value from index & chapter, easily usable for sorting */
	combined: number;
}
export interface MangaData {
	/** Is MangaData still loading? */
	loading: boolean;
	/** Manga's slug, for example Fire-Brigade-Of-Flames */
	slug: string;
	/** Manga's title. "Fire Force" for example  */
	title: string | null;
	/** Manga's description, varying lengths */
	description: string | null;
	/** Manga's poster URL. `null  if not found*/
	poster: string | null;
	/** Array of chapters */
	chapters: Chapter[];
	/** Requested data */
	current?: {
		/** Request chapter number */
		chapter: number;
		/** Request season */
		index: number;
		/** Array of image sources */
		sources: string[];
	}
}

interface Options {
	chapter?: number;
	index?: number;
}

// Useful helpers
const loadingState = {
	loading: true,
	title: "Loading...",
	description: "",
	poster: "",
	chapters: [],
	slug: "",
	current: {
		chapter: -1,
		index: -1,
		sources: []
	}
};
export { loadingState };

// Main data-fetching functions
async function mangasee(slug: string, opts: Options = { index: 1 }): Promise<MangaData> {
	
	// Generate URls
	let msUrl = `https://mangaseeonline.us/manga/${slug}`;
	let newUrl = "https://api.allorigins.win/get?url=" + msUrl;

	// Fetch HTML from URLs
	let data = await (await fetch(newUrl)).json();
	let string = data.contents;

	// Parse the HTML
	let div = document.createElement("div");
	div.innerHTML = string;

	// Get data from HTML
	let poster: string | null = null;
	let posterEl = div.querySelector<HTMLImageElement>(".leftImage img");
	if(posterEl) poster = posterEl.src;

	let title = div.querySelector(".SeriesName")?.textContent ?? "Manga not found."; 
	let description = div.querySelector(".description")?.textContent ?? "If you see this page, that means the manga wasn't found. Sorry about that.";

		// Get chapter data
	let chapterLinks = Array.from(div.querySelectorAll(".list.chapter-list > a")) as HTMLAnchorElement[];

	let chapters = chapterLinks.map((a, i) => {
		// `a` is an element here
		
		let href = a.href;
		// Get URL chapter
		let chapterMatch = href.match(/chapter-(\d+)/);
		let chapter = chapterMatch ? Number(chapterMatch[1]) : 0;

		// Get URL index, season, whatever
		let indexMatch = href.match(/index-(\d+)/);
		let index = indexMatch ? Number(indexMatch[1]) : 1; // Default index is 1, not 0.

		return {
			slug: `/${slug}/${index}-${chapter}/`,
			label: a.querySelector(".chapterLabel")?.textContent ?? "No label",
			datetime: a.querySelector("time")?.getAttribute("datetime") ?? "No datetime",
			index,
			chapter,
			combined: Number(`${index}${chapter.toString().padStart(3, "0")}`)
		}
	});

	// Check if chapter & index were provided and fetch data if so
	let current;
	if(typeof opts.chapter !== "undefined") {
		// Generate chapter URLs
		let chapterUrl = `https://mangaseeonline.us/read-online/${slug}-chapter-${opts.chapter}-index-${opts.index}.html`;
		let newUrl = "https://api.allorigins.win/get?url=" + chapterUrl;
		
		// Fetch HTML
		let data = await (await fetch(newUrl)).json();
		let string = data.contents;

		// Parse HTML
		let chapterDiv = document.createElement("div");
		chapterDiv.innerHTML = string;

		// Get images from HTML elements
		let imgs: HTMLImageElement[] = Array.from(chapterDiv.querySelectorAll(".fullchapimage img"));
		let images = imgs.map(el => el.src);

		// Now set current variable to relevant data
		current = {
			chapter: opts.chapter ?? 0,
			index: opts.index ?? 1,
			sources: images
		}

	}

	return {
		title: title ?? null,
		description: description ?? null,
		poster, // Poster's element is HTMLImageElement so no null there
		chapters: chapters.sort((a, b) => a.combined - b.combined),
		slug,
		current,
		loading: false
	};

}

export default mangasee;