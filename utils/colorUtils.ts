export const getColorEmoji = (color: string): string => {
    const colorMap: { [key: string]: string } = {
        'Brown': '🟤',
        'Black': '⚫',
        'Blonde': '🟡',
        'Red': '🔴',
        'Auburn': '🟠',
        'White': '⚪',
        'Gray': '🩶',
        'Green': '🟢',
        'Blue': '🔵',
        'Hazel': '🟤',
        'Amber': '🟠',
        'Purple': '🟣',
        'Violet': '🟣',
    };
    
    return colorMap[color] || '⚪';
};