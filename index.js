/**
 * Professional week calculator for logistics systems
 * Calculates week numbers based on Monday-to-Sunday intervals
 * @param {Date|string} selectedDate - Input date
 * @returns {number} Week number
 */
const getWeekByDate = (selectedDate) => {
    const date = new Date(selectedDate);
    date.setHours(0, 0, 0, 0);

    // Find Monday of this week
    const day = date.getDay();
    const monday = new Date(date);
    monday.setDate(date.getDate() - (day === 0 ? 6 : day - 1));

    // Calculate week number from year start
    const startOfYear = new Date(monday.getFullYear(), 0, 1);
    startOfYear.setHours(0, 0, 0, 0);

    // First Monday of the year
    const firstMonday = new Date(startOfYear);
    if (firstMonday.getDay() !== 1) {
        firstMonday.setDate(startOfYear.getDate() + (8 - startOfYear.getDay()) % 7);
    }

    // If Monday is before first Monday of year, it's last week of previous year
    if (monday < firstMonday) {
        const prevYearEnd = new Date(monday.getFullYear() - 1, 11, 31);
        return getWeekByDate(prevYearEnd);
    }

    // Calculate difference in weeks
    const diffTime = monday.getTime() - firstMonday.getTime();
    const diffWeeks = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));

    return diffWeeks + 1;
};

/**
 * Get the complete week range for a given date
 * @param {Date|string} selectedDate - Input date
 * @returns {{start: Date, end: Date}} Week range (Monday to Sunday)
 */
const getWeekRange = (selectedDate) => {
    const date = new Date(selectedDate);
    date.setHours(0, 0, 0, 0);

    // Find Monday of this week
    const day = date.getDay();
    const start = new Date(date);
    start.setDate(date.getDate() - (day === 0 ? 6 : day - 1));

    // Find Sunday of this week
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    return { start, end };
};

/**
 * Get week information including number and range
 * @param {Date|string} selectedDate - Input date
 * @returns {{weekNumber: number, start: Date, end: Date}} Week info
 */
const getWeekInfo = (selectedDate) => {
    const weekNumber = getWeekByDate(selectedDate);
    const { start, end } = getWeekRange(selectedDate);
    
    return {
        weekNumber,
        start,
        end
    };
};

module.exports = {
    getWeekByDate,
    getWeekRange,
    getWeekInfo
};