function formatDate(date: Date): string {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('fr-FR');
}

export function getCurrentDate(): string {
    const currentDate = new Date();
    return formatDate(currentDate);
}

export function getDateIn14Days(): string {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 14));
    return formatDate(futureDate);
}