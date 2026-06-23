import { differenceInDays } from "date-fns";

export function dateSinceSaved(currDate, savedDate) {
  return differenceInDays(currDate, savedDate);
}

export function dateSinceVisit(currDate, visitDate) {
  return differenceInDays(currDate, visitDate);
}