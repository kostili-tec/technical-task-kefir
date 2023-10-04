export const formatData = (dateString: Date | string) => {
    const date = new Date(dateString);
    const currentDate = new Date();
    const threeHours = 3600 * 3;

    const timeDifferenceInSeconds = Math.floor((+currentDate - +date) / 1000);

    if (timeDifferenceInSeconds < threeHours) {
        return formatRelativeDate(dateString);
    } else {
        return formatAbsoluteDate(dateString);
    }
};

const formatAbsoluteDate = (dateString: Date | string) => {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Месяцы начинаются с 0
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const formattedDate = `${formattedDay}.${formattedMonth}.${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    return formattedDate;
};

const formatRelativeDate = (dateString: Date | string) => {
    const date = new Date(dateString);
    const currentDate = new Date();

    const timeDifferenceInSeconds = Math.floor((+currentDate - +date) / 1000);

    if (timeDifferenceInSeconds < 3600) {
        return `less than an hour ago`;
    } else if (timeDifferenceInSeconds < 7200) {
        return `an hour ago`;
    } else {
        const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
        return `${hoursAgo} hours ago`;
    }
};
