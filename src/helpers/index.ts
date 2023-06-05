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

export const getHoursAgoByDate = (serverDateTimeStamp: Date): string => {
    console.log("this as the serverDateTimeStamp",serverDateTimeStamp)
    const serverDate: Date = new Date(serverDateTimeStamp);
    const currentDate: Date = new Date();
    const timeDiff: number = currentDate.getTime() - serverDate.getTime();
    console.log("here is the ",serverDate, currentDate)
    const hoursDiff: number = Math.floor(timeDiff / (1000 * 60 * 60));
    return hoursDiff + " hours ago";
};
