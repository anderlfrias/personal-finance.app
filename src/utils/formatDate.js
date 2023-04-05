import { PERSIST_STORE_NAME } from 'constants/app.constant'
import deepParseJson from 'utils/deepParseJson'

const getLocale = () => {
    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
    const persistData = deepParseJson(rawPersistData)
    const locale = persistData?.theme?.locale;

    return locale || 'en';
}

export default function formatDate(date) {
    if (!date) return null;
    return new Intl.DateTimeFormat(getLocale(), {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    }).format(date);
}

export function formatDateTime(date) {
    if (!date) return null;
    return new Intl.DateTimeFormat(getLocale(), {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    }).format(date);
}