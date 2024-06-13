export function summarizeStructure(data, path = '') {
    if (Array.isArray(data)) {
        // Optionally, analyze the structure of the first item if the array is not empty
        let itemType = 'Empty Array';
        if (data.length > 0) {
            itemType = summarizeStructure(data[0], `${path}[]`);
        }
        return [itemType];
    } else if (typeof data === 'object' && data !== null) {
        const keys = Object.keys(data);
        const structure = {};
        for (let key of keys) {
            structure[key] = summarizeStructure(data[key], `${path}.${key}`);
        }
        return structure;
    } else {
        return typeof data; // Returns the type of primitive data
    }
}

export function findFirstNonZeroDecimal(value) {
    if (value >= 1) {
        return -1;
    }

    // Convert the number to a string
    const valueStr = value.toString();

    // Find the position of the decimal point
    const decimalIndex = valueStr.indexOf('.');

    // If there's no decimal point, return -1
    if (decimalIndex === -1) {
        return -1;
    }

    // Iterate over each character after the decimal point
    for (let i = decimalIndex + 1; i < valueStr.length; i++) {
        if (valueStr[i] !== '0') {
            return i - decimalIndex;
        }
    }

    // If no non-zero digit is found, return -1
    return -1;
}