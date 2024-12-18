import dayjs from "dayjs";
import parse from 'html-react-parser';
import timezone from 'dayjs/plugin/timezone'; // Import timezone plugin
import utc from 'dayjs/plugin/utc';

const KOREA_TZ = 'Asia/Seoul';
dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (
    date: string | Date | undefined | null,
    time = false,
    dateFormat = "YYYY-MM-DD",
    timeFormat="HH:mm"
) => {
    if(!date)
        return date;
    const timeString = time ? ` ${timeFormat}` : "";
    return dayjs(date).format(`${dateFormat}${timeString}`);
};

export const formatDateKorean = (range,time=false,format=undefined) => {
    if(!range)
        return range;
    const currFormat = time ? `YYYY-MM-DD HH:mm` : format || "YYYY-MM-DD";
    return dayjs(range).tz(KOREA_TZ).format(currFormat);
};

export const formatNumberWithCommas = (
    number: number | undefined,
    fraction = 1,
): string | undefined => {
    if (number === undefined) return '0';
    const formatter = new Intl.NumberFormat("ko-KR", {
        maximumFractionDigits: fraction,
    });
    return formatter.format(number);
};

export const formatDateWithLabels = (date = new Date()) => {
    const formattedDate = date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace('. ', '년 ').replace('. ', '월 ').replace('.', '일');

    return formattedDate;

}

export const parseHtml = (html: string) => {
    if(!html)
        return html;

    return parse(html)
}

export const getImagePreviewUrl = (file?: File | null) => {
    if (!file)
        return file;
    return URL.createObjectURL(file)
}

export const formatPhoneNumber = (phoneNumber?: string | null) => {
    /* add hyphen after first 3 digit and then after 4 digit */
    if (!phoneNumber)
        return phoneNumber;

    return phoneNumber.replace(/(\d{3})(\d{4})/, '$1-$2-'); // match the first 3 digits and then next 3 digits and then next 4 digits
}


export const KOREAN_PHONE_REGEX = /^010-?\d{4}-?\d{4}$/;

export const KOREAN_COMPANY_PHONE_REGEX =  /^0\d+$/;


