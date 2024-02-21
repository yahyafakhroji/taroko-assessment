export function sortByString(key: string, order: 'asc' | 'desc', items: any[]) {
  const sortKey = (obj: any) => obj[key].toLowerCase(); // Use lowercase for case-insensitive sorting

  return items.slice().sort((a, b) => {
    const comparison = sortKey(a) < sortKey(b) ? -1 : 1;

    return order === 'asc' ? comparison : -comparison;
  });
}
