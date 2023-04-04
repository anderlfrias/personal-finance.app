
export const getLastDayOfMonth = (year, month) => {
    const date = new Date(year, month + 1, 0);
    return date.getDate();
};

export const getStartDate = () => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getEndDate = () => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), getLastDayOfMonth(date.getFullYear(), date.getMonth()), 23, 59, 59);
};

export const getLastHoursOfDay = (date) => {
    const d = date ? new Date(date) : new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);
}