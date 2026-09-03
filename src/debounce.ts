let timerId: ReturnType<typeof setTimeout>;

export function debounceCheck(inputValue: string, callback: (val: string) => void, delayMs = 400) {
    // Cancel previous scheduled call if user typed again before timeout ended
    clearTimeout(timerId);

    // Set a new timer
    timerId = setTimeout(() => {
        callback(inputValue);
    }, delayMs);
}