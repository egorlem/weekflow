

const parseParts = (dateStr) => {
    const dateParts = dateStr.split('-');
    return {
        year: Number(dateParts[0]),
        month: Number(dateParts[1]),
        day: Number(dateParts[2]),
    }
};

/**
 * Professional week calculator for logistics systems
 * Calculates week numbers based on Monday-to-Sunday intervals
 * @param {Date|string} selectedDate - Input date
 * @returns {number} Week number
 */
export const getWeekByDate = (selectedDate) => {
    try {
        // Extract pure date components ignoring timezones
        const dateStr = new Date(selectedDate).toISOString().split('T')[0];
        const { year, month, day } = parseParts(dateStr);

        // Create normalized UTC date
        const utcDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

        // Find Monday of the current week
        const utcDay = utcDate.getUTCDay();
        const monday = new Date(utcDate);
        monday.setUTCDate(utcDate.getUTCDate() - (utcDay === 0 ? 6 : utcDay - 1));

        // Calculate first Monday of the year
        const startOfYear = new Date(Date.UTC(monday.getUTCFullYear(), 0, 1, 12, 0, 0));
        const firstMonday = new Date(startOfYear);

        if (firstMonday.getUTCDay() !== 1) {
            firstMonday.setUTCDate(startOfYear.getUTCDate() + (8 - startOfYear.getUTCDay()) % 7);
        }

        // Handle year boundary cases
        if (monday < firstMonday) {
            const prevYearEnd = new Date(Date.UTC(monday.getUTCFullYear() - 1, 11, 31, 12, 0, 0));
            return getWeekByDate(prevYearEnd);
        }

        // Calculate week difference
        const diffTime = monday.getTime() - firstMonday.getTime();
        const diffWeeks = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));

        return diffWeeks + 1;
    } catch (error) {
        console.error('Error in getWeekByDate:', error);
        return 1; // Fallback to week 1
    }
};

/**
 * Get the complete week range for a given date
 * @param {Date|string} selectedDate - Input date
 * @returns {{start: Date, end: Date}} Week range (Monday to Sunday)
 */
export const getWeekRange = (selectedDate) => {
    try {
        // Extract pure date components ignoring timezones
        const dateStr = new Date(selectedDate).toISOString().split('T')[0];

        const { year, month, day } = parseParts(dateStr);

        const utcDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

        // Calculate week boundaries
        const utcDay = utcDate.getUTCDay();
        const start = new Date(utcDate);
        start.setUTCDate(utcDate.getUTCDate() - (utcDay === 0 ? 6 : utcDay - 1));

        const end = new Date(start);
        end.setUTCDate(start.getUTCDate() + 6);

        // Normalize output times
        start.setUTCHours(0, 0, 0, 0);
        end.setUTCHours(0, 0, 0, 0);

        return { start, end };
    } catch (error) {
        console.error('Error in getWeekRange:', error);
        const fallback = new Date();
        return { start: fallback, end: fallback };
    }
};

/**
 * Get comprehensive week information
 * @param {Date|string} selectedDate - Input date
 * @returns {{weekNumber: number, start: Date, end: Date}} Week info
 */
export const getWeekInfo = (selectedDate) => {
    const weekNumber = getWeekByDate(selectedDate);
    const { start, end } = getWeekRange(selectedDate);

    return {
        weekNumber,
        start,
        end
    };
};

// module.exports = {
//     getWeekByDate,
//     getWeekRange,
//     getWeekInfo
// };