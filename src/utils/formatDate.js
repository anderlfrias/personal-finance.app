import { PERSIST_STORE_NAME } from 'constants/app.constant'
import deepParseJson from 'utils/deepParseJson'

const getLocale = () => {
    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
    const persistData = deepParseJson(rawPersistData)
    const locale = persistData?.theme?.locale;

    return locale || 'en';
}

export default function formatDate(value) {
    return new Intl.DateTimeFormat(getLocale(), {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    }).format(value);
}

export function formatDateTime(value) {
    return new Intl.DateTimeFormat(getLocale(), {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    }).format(value);
}