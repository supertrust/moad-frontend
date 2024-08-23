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