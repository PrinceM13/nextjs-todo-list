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
export const dateToString = (date: Date | null) =>
  new Date(date ?? "").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
