export function sortItems(items, type = 'title', order = 'asc') {
    const sorted = [...items];
    if (type === 'title' || type === 'name') {
      sorted.sort((a, b) => {
        const textA = (a.title || a.name).toLowerCase();
        const textB = (b.title || b.name).toLowerCase();
        return order === 'asc' ? textA.localeCompare(textB) : textB.localeCompare(textA);
      });
    } else if (type === 'popularity') {
      sorted.sort((a, b) =>
        order === 'asc' ? a.popularity - b.popularity : b.popularity - a.popularity
      );
    }
    return sorted;
  }
  