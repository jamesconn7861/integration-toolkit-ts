function removeSymbols(value: string) {
    return value.replace(/[^a-zA-Z0-9., ]/g, '');
}

function removeLetters(value: string) {
    return value.replace(/[a-zA-Z]/g, '');
}

function removeNumbers(value: string) {
    return value.replace(/[0-9]/g, '');
}

function capitalizeCell(value: string) {
    return value.toUpperCase();
}

function lowercaseCell(value: string) {
    return value.toLowerCase();
}

function removeFirstChar(value: string) {
    return value.slice(1, value.length);
}

function removeLastChar(value: string) {
    return value.slice(0, -1);
}

export {removeSymbols, removeLetters, removeNumbers, capitalizeCell, lowercaseCell, removeFirstChar, removeLastChar}