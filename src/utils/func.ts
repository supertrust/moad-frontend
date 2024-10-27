export function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            //@ts-ignore
            func.apply(this, args);
        }, delay);
    };
}

export const logger = {
    log: (...args) => {
        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log(...args);
        }
    },
    warn: (...args) => {
        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.warn(...args);
        }
    },
    error: (...args) => {
        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.error(...args);
        }
    },
};


