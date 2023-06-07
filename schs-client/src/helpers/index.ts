export const urlContains = (url: string, searchTexts: string[]): boolean => {
    return searchTexts.some((searchText) => url.includes(searchText));
  };
  