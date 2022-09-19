import { formatDistanceToNow, parseISO } from "date-fns";

export const formatDateForDisplay = (dateString: string): string => {
  return formatDistanceToNow(parseISO(dateString), {
    addSuffix: true,
  });
};
