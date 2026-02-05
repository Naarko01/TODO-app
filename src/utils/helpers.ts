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
 * @returns {Date} A Date object representing tomorrow's date.
 */
function getTomorrowDate(): Date {
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	return tomorrow;
}

export { formatDateToInput, getTomorrowDate };
