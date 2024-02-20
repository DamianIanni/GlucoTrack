function getHoursFromDate(date) {
    objDate = new Date(date)
    let hours = objDate.getHours();
    let minutes = objDate.getMinutes();
  
    // Check if it's AM and prepend a zero if so
    const isAM = hours < 12;
    if (isAM && hours < 10) {
      hours = `0${hours}`;
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    // Convert to 12-hour format
    // if (hours > 12) {
    //   hours -= 12;
    // }
  
    return `${hours}:${minutes}`;
  }

  export default getHoursFromDate