export const formatDate = (date: Date) => {
  const data = new Date(date);

  const day = String(data.getDate()).padStart(2, '0');
  const month = String(data.getMonth() + 1).padStart(2, '0');
  const year = String(data.getFullYear()).slice(-2);
  const hours = String(data.getHours()).padStart(2, '0');
  const minutes = String(data.getMinutes()).padStart(2, '0');
  const seconds = String(data.getSeconds()).padStart(2, '0');

  return `${day}.${month}.${year}:${hours}.${minutes}.${seconds}`;
};
