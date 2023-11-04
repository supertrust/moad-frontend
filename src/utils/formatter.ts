import dayjs from "dayjs";


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
    if (number === undefined) return number;
    const formatter = new Intl.NumberFormat("ko-KR", {
        maximumFractionDigits: fraction,
    });
    return formatter.format(number);
};