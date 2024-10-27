import { API_BASE_URL } from "@src/config";
import { logger } from "@src/utils/func";

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const dateFormat = (datetime: string, format = 'Y-m-d H:i:s') => {
  const dateTimeObj = new Date(datetime);
  const year = dateTimeObj.getFullYear();
  const month = dateTimeObj.getMonth() + 1;
  const day = dateTimeObj.getDate();
  const hours = dateTimeObj.getHours();
  const minutes = dateTimeObj.getMinutes();
  const seconds = dateTimeObj.getSeconds();

  const formattedDateTime = format
    .replace('Y', `${year}`)
    .replace('m', month.toString().padStart(2, '0'))
    .replace('d', day.toString().padStart(2, '0'))
    .replace('H', hours.toString().padStart(2, '0'))
    .replace('i', minutes.toString().padStart(2, '0'))
    .replace('s', seconds.toString().padStart(2, '0'));

  return formattedDateTime;
}

export const getFileName = (url: string) => {
  const pathSegments = url.split('/');
  const filenameSegment = pathSegments.pop();
  const filename = filenameSegment?.split('?')[0];
  return filename;
}

export const downloadFile = (url: string, filename: string, newTab = true) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  if (newTab) {
    link.target = '_blank';
  }
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
}

export const getHoursAgoByDate = (serverDateTimeStamp: Date) => {
  const date = (serverDateTimeStamp instanceof Date) ? serverDateTimeStamp : new Date(serverDateTimeStamp);
  const formatter = new Intl.RelativeTimeFormat('ko');
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      //@ts-ignore
      return formatter.format(Math.round(delta), key);
    }
  }
};


export const getFileUrl = (path: string) => {
  return API_BASE_URL + path;
}

/**
 * https://github.com/kwseok/hangul.js/blob/master/src/isHangul.js
 */
export const isHangul = (str?: string) => {
  str = str?.trim();
  if (!str) return true;
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i)
    if (c !== 32 && (c < 0xAC00 || c > 0xD7A3)) {
      return false
    }
  }
  return true
}

export const formatTimeFromMinute = (n: number) => {
  const seconds = Math.round(n);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    const remainingMinutes = minutes % 60;
    return `${hours}시간 ${remainingMinutes > 0 ? remainingMinutes + '분' : ''}`;
  }

  if (minutes > 0) {
    return `${minutes}분`;
  }

  return `${seconds}초`;
};


export const addWeeks = (date: Date, weeks: number) => {
  date.setDate(date.getDate() + 7 * weeks);
  return date;
}

export const ISOformatDate = (d: Date) => d.toISOString().split('T')[0]

export const ISOformatTime = (d: Date) => d.toISOString().split('T')[1].split(':')

export const DateSelected = (selectedFilter) => {
  const today = new Date();
  switch (selectedFilter) {
    case "today":
      return { startDate: new Date(), endDate: new Date() };
    case "this_week":
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());

      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() - today.getDay() + 6);

      return { startDate: startOfWeek, endDate: endOfWeek };
    case "last_week":
      const lastWeekStartDate = new Date(today);
      lastWeekStartDate.setDate(today.getDate() - today.getDay() - 7);

      const lastWeekEndDate = new Date(today);
      lastWeekEndDate.setDate(today.getDate() - today.getDay() - 1);

      return { startDate: lastWeekStartDate, endDate: lastWeekEndDate };
    case "this_month":
      const thisMonthStartDate = new Date(today.getFullYear(), today.getMonth(), 2);
      const nextMonthStartDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      const thisMonthEndDate = new Date(nextMonthStartDate.getTime() - 1);

      return {
        startDate: thisMonthStartDate,
        endDate: thisMonthEndDate,
      };
    case "last_month":
      const lastMonthStartDate = new Date(today.getFullYear(), today.getMonth() - 1, 2);
      const currentMonthStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastMonthEndDate = new Date(currentMonthStartDate.getTime() - 1);

      return {
        startDate: lastMonthStartDate,
        endDate: lastMonthEndDate,
      };
    case "this_year":
      const thisYearStartDate = new Date(today.getFullYear() - 1, 12, 2);
      const nextYearStartDate = new Date(today.getFullYear() + 1, 0, 1);
      const thisYearEndDate = new Date(nextYearStartDate.getTime() - 1);

      return {
        startDate: thisYearStartDate,
        endDate: thisYearEndDate,
      };
    case "last_year":
      const lastYearStartDate = new Date(today.getFullYear() - 2, 12, 2);
      const currentYearStartDate = new Date(today.getFullYear(), 0, 1);
      const lastYearEndDate = new Date(currentYearStartDate.getTime() - 1);

      return {
        startDate: lastYearStartDate,
        endDate: lastYearEndDate,
      };
    case "all":
      return {
        startDate: '',
        endDate: '',
      };
    default:
      return {
        startDate: '',
        endDate: '',
      };;
  }
}

export const totalDays = (startDate, endDate) => {

  const timeDifference = endDate - startDate;

  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}

export const getNextMonthDates = (type, date) => {
  const givenDate = new Date(date);
  const year = givenDate.getFullYear();
  const month = givenDate.getMonth();

  const nextMonth = (month + 1) % 12;
  const nextYear = nextMonth === 0 ? year + 1 : year;

  var startDate = new Date(nextYear, nextMonth, 1);
  var endDate = new Date(nextYear, nextMonth + 1, 0);
  if (type == "prev") {
    const previousMonth = month === 0 ? 11 : month - 1;
    const previousYear = month === 0 ? year - 1 : year;

    startDate = new Date(previousYear, previousMonth, 1);
    endDate = new Date(year, month, 0);
  }
  return {
    startDate: startDate,
    endDate: endDate,
  };
};
export const getNextPrevDates = (type, date) => {
  var currentDate = new Date(date);

  if (type == "prev") {
    date.setDate(currentDate.getDate() - 1);
  } else {
    date.setDate(currentDate.getDate() + 1);
  }
  return new Date(date);
};

export function numberWithHyphens(number, name = '') {
  try {
    const numberString = String(number);
    let formattedNumber = numberString;

    if (numberString.length >= 4) {
      formattedNumber = formattedNumber.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    }

    if (name == 'business_registration_number') {
      formattedNumber = numberString.replace(/^(\d{3})(\d{0,2})(\d{0,5})$/, (_, $1, $2, $3) => $1 + ($2 ? '-' + $2 : '') + ($3 ? '-' + $3 : ''));
    } else if (numberString.length >= 8) {
      formattedNumber = numberString.replace(/(\d{3})(\d{2})(\d{5,10})/, '$1-$2-$3');
    }

    return formattedNumber;
  } catch (e) {
    return 0;
  }
}



export function numberWithoutHyphens(koreanPhoneNumber, prevValue) {
  try {
    // Remove hyphens and convert back to a number
    const numberWithoutHyphens = koreanPhoneNumber.replace(/-/g, '').replace(/[^\d]/g, '');
    if (!numberWithoutHyphens) return;

    logger.log('numberWithoutHyphens: ', numberWithoutHyphens, parseInt(numberWithoutHyphens, 10));
    return parseInt(numberWithoutHyphens, 10);
  } catch (e) {
    logger.log('numberWithoutHyphens-catch: ', prevValue, 'error: ', e);
    return prevValue;
  }
}



export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



export function darkenColor(hex, percent) {
  // Convert hex color to RGB
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  // Convert RGB to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  // Darken the color
  l *= 1 - (percent / 100);

  // Convert HSL back to RGB
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h * 6) % 2 - 1));
  let m = l - c / 2;
  let r1, g1, b1;
  if (h >= 0 && h < 1 / 6) {
    r1 = c;
    g1 = x;
    b1 = 0;
  } else if (h >= 1 / 6 && h < 1 / 3) {
    r1 = x;
    g1 = c;
    b1 = 0;
  } else if (h >= 1 / 3 && h < 1 / 2) {
    r1 = 0;
    g1 = c;
    b1 = x;
  } else if (h >= 1 / 2 && h < 2 / 3) {
    r1 = 0;
    g1 = x;
    b1 = c;
  } else if (h >= 2 / 3 && h < 5 / 6) {
    r1 = x;
    g1 = 0;
    b1 = c;
  } else {
    r1 = c;
    g1 = 0;
    b1 = x;
  }

  // Convert back to 8-bit RGB
  r = Math.round((r1 + m) * 255);
  g = Math.round((g1 + m) * 255);
  b = Math.round((b1 + m) * 255);

  // Convert RGB to hex
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
