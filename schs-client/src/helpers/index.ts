import { TrackAthleteResult } from "../api/Track/athletes";

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

export function convertGrade(grade: string | number) {
  if (typeof grade === 'string') {
    switch (grade) {
      case 'all':
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
        return -1; 
    }
  } else if (typeof grade === 'number') {
    switch (grade) {
      case 0:
        return 'all';
      case 12:
        return 'senior';
      case 11:
        return 'junior';
      case 10:
        return 'sophomore';
      case 9:
        return 'freshmen';
      default:
        return 'unknown'; 
    }
  }
  
}

export function getYearFromDate(inputDate: string): number {
  const date = new Date(inputDate);
  return date.getFullYear();
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
}


export function parseNumberString(numberString: string) {
  const numbers = numberString.split(',');
  const parsedNumbers = numbers.map((num) => parseFloat(num));

  return parsedNumbers;
}

export function extractXCRaceResultData(array: any[]) {
  const uniqueDates: any[] = [];
  const uniqueArray: any[] = [];

  array.forEach((obj) => {
    const { courseName, courseDistance, date, raceName, raceId } = obj;

    if (!uniqueDates.includes(date)) {
      uniqueDates.push(date);
      uniqueArray.push({ courseName, courseDistance, date, raceName, raceId });
    }
  });

  return uniqueArray;
}

export function groupEvents(results: TrackAthleteResult[]) {
  const groupedEvents = results.reduce((groups: any, result) => {
    const { event, eventId, fullName, grade, year, squadName, squadId, athleteId, genderId, result1, result2 } = result;
    const key = event + '-' + eventId;
    
    if (!groups[key]) {
      groups[key] = {
        event,
        eventId,
        results: []
      };
    }
    
    groups[key].results.push({
      fullName,
      grade,
      year,
      squadName,
      squadId,
      athleteId,
      genderId,
      result1,
      result2
    });
    
    return groups;
  }, {});
  
  return Object.values(groupedEvents);
}