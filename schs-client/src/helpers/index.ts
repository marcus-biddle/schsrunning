export const urlContains = (url: string, searchTexts: string[]): string | null => {
  const foundText = searchTexts.find((searchText) => {
    const regex = new RegExp(`\\b${searchText}\\b`, 'i');
    return regex.test(url);
  });

  return foundText || null;
};

export function convertToNum(str: string | undefined): number {
  return str ? parseInt(str, 10) : 0;
}

export function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) {
    return str; // Return an empty string if input is empty
  }

  const firstLetter = str.charAt(0).toUpperCase();
  const restOfString = str.slice(1);

  return `${firstLetter}${restOfString}`;
}

export function mapGradeToNumber(grade: string) {
  switch (grade) {
    case 'all-time':
      return 0;
    case 'senior':
      return 12;
    case 'junior':
      return 11;
    case 'sophomore':
      return 10;
    case 'freshmen':
      return 9;
    default:
      return -1; // Or any other value to represent an invalid grade
  }
}

export function getYearFromDate(inputDate: string): number {
  const date = new Date(inputDate);
  return date.getFullYear();
}
