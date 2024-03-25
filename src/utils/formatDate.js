export const formatDate = (dateString) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const dateParts = dateString.split('-');
    const day = parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[1], 10);

    return day + ' ' + months[month - 1];
};
