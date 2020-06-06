
// Interfaces
export interface MangaData {
	slug: string;
	title: string | null;
	description: string | null;
	poster: string | null;
	chapters: {
		datetime: string;
		label: string;
		slug: string;
		chapter: number;
		index: number;
		combined: number;
	}[];
	current?: {
		chapter: number;
		index: number;
		sources: string[];
	}
}

interface Options {
	chapter?: number;
	index?: number;
}

// Useful helpers
const loadingState = {
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
	let poster = (div.querySelector(".leftImage img") as HTMLImageElement).src;
	let title = div.querySelector(".SeriesName")?.textContent;
	let description = div.querySelector(".description")?.textContent;

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
		current
	};

}

export default mangasee;