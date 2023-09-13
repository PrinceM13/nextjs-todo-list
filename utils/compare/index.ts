// * compoare if due date is greater than current date
export const isOverdue = (dueDate: string): boolean => {
  // * get current date
  const currentDate = new Date().toISOString().split("T")[0];

  // * compare date
  const dueDateArr = dueDate.split("-").map((item) => parseInt(item));
  const currentDateArr = currentDate.split("-").map((item) => parseInt(item));

  if (dueDateArr[0] < currentDateArr[0]) {
    return true;
  } else if (dueDateArr[0] === currentDateArr[0]) {
    if (dueDateArr[1] < currentDateArr[1]) {
      return true;
    } else if (dueDateArr[1] === currentDateArr[1]) {
      if (dueDateArr[2] < currentDateArr[2]) {
        return true;
      }
    }
  }
  return false;
};
