import type { SortOptions } from "./constants.js";
import type { SortOrders, Todo } from "./types.js";

/**
 * @param {Date} date A Date object to be formatted into a string suitable for an HTML date input field.
 * @returns {string} A string in the format "YYYY-MM-DD" representing the given date.
 */
function formatDateToInput(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

/**
 *
 * @param {string} dateString A string in the format "DD/MM/YYYY" that needs to be converted to "YYYY-MM-DD".
 * @returns {string} A string in the format "YYYY-MM-DD" suitable for an HTML date input field.
 */
function dateStringToInput(dateString: string): string {
	const formatedString = dateString.split("/").reverse().join("-");
	return formatedString;
}

/**
 * @returns {Date} A Date object representing tomorrow's date.
 */
function getTomorrowDate(): Date {
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	return tomorrow;
}

/**
 *
 * @param str A string that needs to be transformed to start with a capital letter.
 * @returns Same string but with the first letter capitalized.
 */
function startWithCapital(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 *
 * @param list The list of Todo items to be sorted.
 * @param sortingOptions The key of the SortOptions enum that determines the property by which the list should be sorted (e.g., "creationDate", "deadline", "done", "title").
 * @param sortOrders A string that indicates the sorting order, either "asc" for ascending or "desc" for descending.
 * @returns A new array of Todo items sorted according to the specified sorting options and order.
 */
function sortList(
	list: Todo[],
	sortingOptions: keyof typeof SortOptions,
	sortOrders: SortOrders,
): Todo[] {
	const sorted = [...list];
	switch (sortingOptions) {
		case "creationDate":
			sorted.sort((a, b) => {
				const dateA = new Date(a.creationDate).getTime();
				const dateB = new Date(b.creationDate).getTime();
				return sortOrders === "asc" ? dateA - dateB : dateB - dateA;
			});
			break;
		case "deadline":
			sorted.sort((a, b) => {
				if (a.deadline !== undefined && b.deadline !== undefined) {
					const dateA = new Date(a.deadline).getTime();
					const dateB = new Date(b.deadline).getTime();
					return sortOrders === "asc" ? dateA - dateB : dateB - dateA;
				}
				return 0;
			});
			break;
		case "done":
			sorted.sort((a, b) =>
				sortOrders === "asc"
					? Number(a.done) - Number(b.done)
					: Number(b.done) - Number(a.done),
			);
			break;
		case "title":
			sorted.sort((a, b) =>
				sortOrders === "asc"
					? a.title.charCodeAt(0) - b.title.charCodeAt(0)
					: b.title.charCodeAt(0) - a.title.charCodeAt(0),
			);
			break;
	}
	return sorted;
}

export {
	formatDateToInput,
	getTomorrowDate,
	dateStringToInput,
	startWithCapital,
	sortList,
};
