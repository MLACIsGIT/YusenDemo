export function isNull(text, valueWhenNull = '', expireDate) {
    return (text === null || text === undefined) ? valueWhenNull : text;
}

export function replaceAll(str, toFind, ReplaceWith) {
    return str.split(toFind).join(ReplaceWith);
}
