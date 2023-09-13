// * convert array of string to string with comma
export const convertArrayToStringWithComma = (array: string[]): string => {
  let result = "";
  array?.forEach((item, idx) => {
    if (idx === array.length - 1) {
      result += item;
    } else {
      result += `${item},`;
    }
  });
  return result;
};

// convert date to locale string
export const dateToString = (date: Date | null) => {
  if (date) {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric"
    };

    const dateFormat: Date = new Date(date);
    const mapMonth: string[] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    const dateString: string =
      dateFormat.getDate() + " " + mapMonth[dateFormat.getMonth()] + " " + dateFormat.getFullYear();
    return dateString;
  } else {
    return "";
  }
};
