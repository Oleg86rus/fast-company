export function displayDate(data) {
  const date = new Date(parseInt(data, 10));
  const dateNow = new Date();
  const yearDif = dateNow.getFullYear() - date.getFullYear();
  if (yearDif === 0) {
    const dayDif = dateNow.getDate() - date.getDate();
    if (dayDif === 0) {
      const hourDif = dateNow.getHours() - date.getHours();
      if (hourDif === 0) {
        const minuteDif = dateNow.getMinutes() - date.getMinutes();
        if (minuteDif >= 0 && minuteDif < 5) return '1 минуту назад';
        if (minuteDif >= 5 && minuteDif < 10) return '5 минут назад';
        if (minuteDif >= 10 && minuteDif < 30) {
          return '10 минут назад';
        }
        return '30 минут назад';
      }
      return `${date.getHours()}:${date.getMinutes()}`;
    }
    return `${date.getDate()} ${date.toLocaleString('default', {
      month: 'long'
    })}`;
  }
  return (
    date.getFullYear() + '.' + (date.getMonth() + 1) + '_' + date.getDate()
  );
}