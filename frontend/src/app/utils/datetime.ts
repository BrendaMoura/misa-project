const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "America/Manaus",
  hour12: false,
};

export const formatDate = (date: Date): string => {
  const createdAt = new Date(date);

  const datetime: string = createdAt.toLocaleString("pt-BR", DATE_FORMAT);

  return datetime;
};
