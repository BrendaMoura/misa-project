type WithStatus = { status: string };

const filterByStatus = <T extends WithStatus>(data: T[], status: string) => {
  return data.filter((item) => item.status === status);
};
