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

export function removeDuplicatesByName(data: any[]) {
  return data.filter((row, index, self) => {
    const duplicateIndex = self.findIndex(
      c => c.firstname === row.firstname && c.lastname === row.lastname
    );
    return index === duplicateIndex;
  });
}

export function groupByCoachTypeId(data: any[]) {
  const groupedData: any = [];
  const groupedMap = new Map();

  data.forEach((item) => {
    const { firstName, lastName, coachTypeId, ...rest } = item;
    const existingGroup = groupedMap.get(coachTypeId);

    if (existingGroup) {
      existingGroup.objects.push(rest);
    } else {
      const newGroup = {
        firstName,
        lastName,
        coachTypeId,
        objects: [rest],
      };
      groupedMap.set(coachTypeId, newGroup);
      groupedData.push(newGroup);
    }
  });

  return groupedData;
}

export interface CompetitorByCourse {
  courseId: number;
  date: string;
  competitorId: string;
  time: string;
  pace: string;
  fullName: string;
}

export function displayCompetitorsByCourse(data: CompetitorByCourse[]): CompetitorByCourse[][] {
  const competitorsByCourse: CompetitorByCourse[][] = [];

  data.forEach((entry) => {
    const { courseId, competitorId, fullName, date, time, pace,  } = entry;

    const competitor: CompetitorByCourse = {
      fullName,
      courseId,
      date,
      competitorId,
      time,
      pace
    };

    const index = competitorsByCourse.findIndex((course) => course[0].courseId === courseId);
    if (index !== -1) {
      competitorsByCourse[index].push(competitor);
    } else {
      competitorsByCourse.push([competitor]);
    }
  });

  competitorsByCourse.forEach((course) => {
    course.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  return competitorsByCourse;
}

type ObjectArray<T> = T[];

export const formFormatObjectArray = <T extends { [key: string]: string | number }>(
  arr: ObjectArray<T>,
  valueProperty: keyof T,
  labelProperty: keyof T
): { value: string; label: string }[] => {
  return arr.flatMap((obj) =>
    Object.entries(obj).map(([key, value]) => ({
      value: key === valueProperty ? value.toString() : key,
      label: key === labelProperty ? value.toString() : key,
    }))
  );
};


export function formatPath(string: string) {
  return string.replace(/-/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
}

export function checkIfMobile(screenWidth: number) {
  // Set the threshold width for mobile devices (example: 992px)
  const mobileWidthThreshold = 768;

  // Get the width of the window screen
  const windowWidth = screenWidth;

  // Check if the window width is smaller than the threshold
  const isMobile = windowWidth < mobileWidthThreshold;

  // Return the result (true for mobile, false for regular computer screen)
  return isMobile;
}

export function getScreenSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return { width, height };
}
