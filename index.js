/**
 * Professional week calculator for logistics systems
 * Calculates week numbers based on Monday-to-Sunday intervals
 * @param {Date|string} selectedDate - Input date
 * @returns {number} Week number
 */
const getWeekByDate = (selectedDate) => {
    // Extract date parts and create pure UTC date (without time)
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    // Create date at noon UTC to avoid timezone issues
    const utcDate = new Date(Date.UTC(year, month, day, 12, 0, 0));

    // Find Monday of this week in UTC
    const utcDay = utcDate.getUTCDay();
    const monday = new Date(utcDate);
    monday.setUTCDate(utcDate.getUTCDate() - (utcDay === 0 ? 6 : utcDay - 1));
    
    // Calculate week number from year start in UTC
    const startOfYear = new Date(Date.UTC(monday.getUTCFullYear(), 0, 1, 12, 0, 0));
    
    // First Monday of the year in UTC
    const firstMonday = new Date(startOfYear);
    if (firstMonday.getUTCDay() !== 1) {
        firstMonday.setUTCDate(startOfYear.getUTCDate() + (8 - startOfYear.getUTCDay()) % 7);
    }

    // If Monday is before first Monday of year, it's last week of previous year
    if (monday < firstMonday) {
        const prevYearEnd = new Date(Date.UTC(monday.getUTCFullYear() - 1, 11, 31, 12, 0, 0));
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
    // Extract date parts and create pure UTC date
    const date = new Date(selectedDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    const utcDate = new Date(Date.UTC(year, month, day, 12, 0, 0));
    
    // Find Monday of this week in UTC
    const utcDay = utcDate.getUTCDay();
    const start = new Date(utcDate);
    start.setUTCDate(utcDate.getUTCDate() - (utcDay === 0 ? 6 : utcDay - 1));
    
    // Find Sunday of this week in UTC
    const end = new Date(start);
    end.setUTCDate(start.getUTCDate() + 6);
    
    // Reset times to midnight for clean output
    start.setUTCHours(0, 0, 0, 0);
    end.setUTCHours(0, 0, 0, 0);
    
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