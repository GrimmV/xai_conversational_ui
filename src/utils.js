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