function formatAMPM(date) {
  // gets the hours
  let hours = date.getHours();
  // gets the month
  let minutes = date.getMinutes();
  // gets AM/PM
  const ampm = hours >= 12 ? 'pm' : 'am';
  // converts hours to 12 hour instead of 24 hour
  hours %= 12;
  // converts 0 (midnight) to 12
  hours = hours || 12; // the hour '0' should be '12'
  // converts minutes to have leading 0
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  // the time string
  const time = `${hours}:${minutes} ${ampm}`;

  // gets the match for the date string we want
  const match = date.toString().match(/\w{3} \w{3} \d{1,2} \d{4}/);

  // the result
  return `${match[0]} ${time}`;
}

document.getElementById('datelux').innerHTML = formatAMPM(new Date());
