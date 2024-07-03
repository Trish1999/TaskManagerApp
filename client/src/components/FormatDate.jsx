export function FormatDate1(data) {
    const date = new Date(data);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getUTCFullYear();

    const getDayWithSuffix = (day) => {
        const j = day % 10,
              k = day % 100;
        if (j === 1 && k !== 11) {
            return day + "st";
        }
        if (j === 2 && k !== 12) {
            return day + "nd";
        }
        if (j === 3 && k !== 13) {
            return day + "rd";
        }
        return day + "th";
    };

    const dayWithSuffix = getDayWithSuffix(parseInt(day, 10));

    return `${dayWithSuffix} ${month}, ${year}`;
}

export function FormatDate2(data) {
    const date = new Date(data);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getUTCFullYear();

    const getDayWithSuffix = (day) => {
        const j = day % 10,
              k = day % 100;
        if (j === 1 && k !== 11) {
            return day + "st";
        }
        if (j === 2 && k !== 12) {
            return day + "nd";
        }
        if (j === 3 && k !== 13) {
            return day + "rd";
        }
        return day + "th";
    };

    const dayWithSuffix = getDayWithSuffix(parseInt(day, 10));

    return `${month} ${dayWithSuffix} `;
}

export function FormatDate3(data) { 
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  const givenDate = new Date(data);
  givenDate.setHours(0, 0, 0, 0); 

  return givenDate > today;
}