
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

export const getStartDateOfYears = (year) => {
    return new Date(year, 0, 1)
}

export const getEndDateOfYears = (year) => {
    return new Date(year, 11, 31, 23, 59, 59)
}

export const getStartDateOfWeeks = (date) => {
    const day = date.getDay()
    const diff = date.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(date.setDate(diff))
}

export const getEndDateOfWeeks = (date) => {
    const day = date.getDay()
    const diff = date.getDate() - day + (day === 0 ? -6 : 1) + 6
    return new Date(date.setDate(diff))
}