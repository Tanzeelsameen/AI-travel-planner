
// This file is kept minimal as the flights feature has been removed
import { format } from "date-fns";

// Helper to format date in YYYY-MM-DD format
export const formatDateForApi = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};
