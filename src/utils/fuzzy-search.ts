export function fuzzySearch(query: string, items: any[]) {
  if (!query) {
    return items; // Return all items if no query
  }

  const lowerQuery = query.toLowerCase();

  return items.filter((obj) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in obj) {
      if (typeof obj[key] === 'string' && obj[key].toLowerCase().includes(lowerQuery)) {
        return true;
      }
    }

    return false;
  });
}
