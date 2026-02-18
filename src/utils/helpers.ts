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

export { formatDateToInput, getTomorrowDate, dateStringToInput, startWithCapital };
