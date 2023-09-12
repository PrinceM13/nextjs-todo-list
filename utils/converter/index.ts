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
