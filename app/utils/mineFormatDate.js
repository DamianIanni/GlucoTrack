function getHoursFromDate(date) {
    objDate = new Date(date)
    let hours = objDate.getHours();
    const minutes = objDate.getMinutes();
  
    // Check if it's AM and prepend a zero if so
    const isAM = hours < 12;
    if (isAM && hours < 10) {
      hours = `0${hours}`;
    }
  
    // Convert to 12-hour format
    if (hours > 12) {
      hours -= 12;
    }
  
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  export default getHoursFromDate