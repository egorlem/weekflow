# 📅 WeekFlow

**Week Calculator for Logistics and Delivery Systems**

A robust and reliable week calculation library designed specifically for logistics, delivery, and scheduling systems. WeekFlow provides consistent Monday-to-Sunday week calculations with professional-grade accuracy.

## 📦 Installation

```bash
npm install weekflow
```

# Example

```JavaScript
getWeekByDate('2023-04-24'); // 17 (Monday)
getWeekByDate('2023-04-30'); // 17 (Sunday - same week)
getWeekByDate('2025-12-29'); // 52 (Monday of last week)
getWeekByDate('2026-01-04'); // 52 (Sunday of last week from previous year)
```

## Quick Start
```JavaScript
const { getWeekByDate, getWeekRange, getWeekInfo } = require('weekflow');

// Get week number for any date in the week
const weekNumber = getWeekByDate('2023-04-24'); // 17
const sameWeek = getWeekByDate('2023-04-30'); // 17 (same week)

// Get the complete week range
const { start, end } = getWeekRange('2023-04-26');
// start: 2023-04-24 (Monday)
// end: 2023-04-30 (Sunday)

// Get comprehensive week information
const weekInfo = getWeekInfo('2023-04-29');
// {
//   weekNumber: 17,
//   start: 2023-04-24T00:00:00.000Z,
//   end: 2023-04-30T00:00:00.000Z
// }
```

## License

This project is licensed under the __MIT License__. See the LICENSE file for details.
