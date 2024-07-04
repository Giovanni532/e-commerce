export function formatDateToReadableString(date: Date | string): string {
    let dateObj: Date;

    if (typeof date === 'string') {
        const [day, month, year] = date.split('/');
        dateObj = new Date(Number(year), Number(month) - 1, Number(day));
    } else {
        dateObj = date;
    }

    return new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(dateObj);
}

export function getCurrentDate(): string {
    const currentDate = new Date();
    return formatDateToReadableString(currentDate);
}

export function getDateIn14Days(): string {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 14));
    return formatDateToReadableString(futureDate);
}