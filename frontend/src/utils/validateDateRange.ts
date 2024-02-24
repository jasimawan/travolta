import { isBefore } from "date-fns/isBefore";
import { isSameDay } from "date-fns/isSameDay";
import { isAfter } from "date-fns/isAfter";

const isValidDateRange = (fromDate: string, toDate: string): boolean => {
  if (isBefore(fromDate, toDate) || isSameDay(fromDate, toDate)) {
    const today = new Date();
    if (isSameDay(fromDate, today) || isAfter(fromDate, today)) {
      return true;
    }
  }

  return false;
};

export default isValidDateRange;
