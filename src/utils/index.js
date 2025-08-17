export const getName = (item) => {
    if (!item) return "No Name";

    // Handle different name formats - ensure we always return a string
    if (typeof item.name === "string") {
        return item.name;
    }

    if (item.name && typeof item.name === "object") {
        // Prioritize English, then Dutch, then first available value
        if (item.name.en && typeof item.name.en === "string") {
            return item.name.en;
        }
        if (item.name.nl && typeof item.name.nl === "string") {
            return item.name.nl;
        }
        // If name is an object but doesn't have en/nl, try to get first value
        const firstKey = Object.keys(item.name)[0];
        if (firstKey && typeof item.name[firstKey] === "string") {
            return item.name[firstKey];
        }
    }

    // Check other possible string fields
    if (typeof item.title === "string") return item.title;
    if (typeof item.label === "string") return item.label;
    if (typeof item.categoryName === "string") return item.categoryName;
    if (typeof item.subcategoryName === "string") return item.subcategoryName;

    // Handle if title is also an object
    if (item.title && typeof item.title === "object") {
        if (item.title.en && typeof item.title.en === "string") return item.title.en;
        if (item.title.nl && typeof item.title.nl === "string") return item.title.nl;
    }

    return "No Name";
};
