export const urlContains = (url: string, searchTexts: string[]): string | null => {
  const foundText = searchTexts.find((searchText) => {
    const regex = new RegExp(`\\b${searchText}\\b`, 'i');
    return regex.test(url);
  });

  return foundText || null;
};

  