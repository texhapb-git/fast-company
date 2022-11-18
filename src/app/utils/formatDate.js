function formatCommentDate(dateValue) {
    const date = new Date(parseInt(dateValue));
    const now = new Date();

    const secondsDiff = Math.floor((now - date) / 1000); // разница в секундах

    if (secondsDiff < 0) {
        return "";
    }

    const minutesDiff = Math.floor(secondsDiff / 60); // разница в минутах

    if (minutesDiff >= 0 && minutesDiff < 1) {
        return "1 минуту назад";
    } else if (minutesDiff >= 1 && minutesDiff < 5) {
        return "5 минут назад";
    } else if (minutesDiff >= 5 && minutesDiff < 10) {
        return "10 минут назад";
    } else if (minutesDiff < 60) {
        return "30 минут назад";
    }

    const hoursDiff = Math.floor(minutesDiff / 60); // разница в часах

    if (hoursDiff >= 1 && hoursDiff < 24) {
        return `${date.getHours()}:${date.getMinutes()}`;
    }

    const daysDiff = Math.floor(hoursDiff / 24); // разница в днях

    if (daysDiff >= 1 && daysDiff < 365) {
        return `${date.getDate()} ${date.toLocaleString("default", { month: "long" })}`;
    } else {
        return `${date.getDate()}.${(date.getMonth() + 1)}.${date.getFullYear()}`;
    }
}

export { formatCommentDate };
