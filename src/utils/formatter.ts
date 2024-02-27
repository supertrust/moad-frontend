import dayjs from "dayjs";
import parse from 'html-react-parser';

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
