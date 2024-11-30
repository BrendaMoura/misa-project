type WithStatus = { status: string };
type WithName = { name: string };

const filterByStatus = <T extends WithStatus>(data: T[], status: string) => {
  return data.filter((item) => item.status === status);
};

const searchByName = <T extends WithName>(data: T[], name: string) => {
  return data.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));
};

export { filterByStatus, searchByName };
