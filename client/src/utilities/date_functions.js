export const retrieveDaySuffix = (day) => {
  console.log("Here", day)
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const convertMonth = (m) => {
  if (m === 1) {
    return 'January';
  }
  if (m === 2) {
    return 'February';
  }
  if (m === 3) {
    return 'March';
  }
  if (m === 4) {
    return 'April';
  }
  if (m === 5) {
    return 'May';
  }
  if (m === 6) {
    return 'June';
  }
  if (m === 7) {
    return 'July';
  }
  if (m === 8) {
    return 'August';
  }
  if (m === 9) {
    return 'September';
  }
  if (m === 10) {
    return 'October';
  }
  if (m === 11) {
    return 'November';
  }
  if (m === 12) {
    return 'December';
  }
};

export const getTime = (t) => {
  const date = new Date(t);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const meridian = hours < 12 ? 'AM' : 'PM';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12 < 10 ? '0' : ''}${hour12}:${
    minutes < 10 ? '0' : ''
  }${minutes} ${meridian} - ${hour12 < 10 ? '0' : ''}${hour12 + 1}:${
    minutes < 10 ? '0' : ''
  }${minutes} ${meridian}`;
};

export const getDate = (inp, usertype) => {
  const parts = inp.split("/"); 
  let day = parts[0];
  let month = parts[1];
  if (usertype === "Student" || usertype === "Admin") {
    day = parts[1];
    month = parts[0];
  } 
  const date = new Date(`20${parts[2]}-${month}-${day}`);
  const formattedDate = `${date.getDate()}${retrieveDaySuffix(date.getDate())} ${convertMonth(date.getMonth() + 1)}`;
  console.log(formattedDate);
  return formattedDate;
}