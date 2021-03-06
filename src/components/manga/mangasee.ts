
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
async function mangasee(slug: string, opts: Options = { index: 1 }): Promise<any> {
	
	// Generate URls
	let msUrl = `https://mangasee123.com/manga/${slug}`;
	let newUrl = "https://api.allorigins.win/get?url=" + msUrl;

	// Fetch HTML from URLs
	let data = await (await fetch(newUrl)).json();
	let string = data.contents;

	// Parse the HTML
	let div = document.createElement("div");
	div.innerHTML = string.replace(/<img/g, "<fake-img");

	// Get manga details
	let title = div.querySelector("h1")?.textContent ?? "Manga not found."; 
	let description = div.querySelector(".top-5.Content")?.textContent ?? "If you see this page, that means the manga wasn't found. Sorry about that.";

		// Get chapter data
	let chapterJSON = JSON.parse(string.split("vm.Chapters = ")[1].split(";")[0]);
	let chapters: Chapter[] = chapterJSON.map((ch: any) => {

		let idString = ch.Chapter.toString(); // 102240

		let index = idString[0];
		let chapter = idString.slice(1, -1);
		while(chapter.startsWith("0") && chapter !== "0") chapter = chapter.slice(1);

		return {
			index: Number(index),
			chapter: Number(chapter),
			slug: `/${slug}/${index}-${chapter}`,
			label: `${ch.Type} ${chapter}`,
			combined: `${index}${chapter.toString().padStart(3, "0")}`,
			datetime: ch.date ?? "No datetime"
		}
	});
	let poster = (div.querySelector(".img-fluid.bottom-5") as HTMLImageElement).src;

	// Get chapter images... If those are a thing
	let current;
	if(typeof opts.chapter !== "undefined") {
		// Generate chapter URLs
		let chapterUrl = `https://mangasee123.com/read-online/${slug}-chapter-${opts.chapter}-index-${opts.index}.html`;
		let newUrl = "https://api.allorigins.win/get?url=" + chapterUrl;

		// Fetch HTML
		let data = await (await fetch(newUrl)).json();
		let string = data.contents;

		// Parse HTML
		let chapterDiv = document.createElement("div");
		chapterDiv.innerHTML = string;

		// Get CDN url
		let cdnUrl = string.split(`vm.CurPathName = "`)[1].split(`"`)[0];

		// Generate images
		let curChapter = JSON.parse(string.split("vm.CurChapter = ")[1].split(";")[0]);

		let images = [];
		let pageCount = Number(curChapter.Page);
		for(let i = 0; i < pageCount; i++) {
			images.push(`https://${cdnUrl}/manga/${slug}/${opts.chapter.toString().padStart(4, "0")}-${(i + 1).toString().padStart(3, "0")}.png`);
		}

		current = {
			chapter: opts.chapter ?? 0,
			index: opts.index ?? 0,
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