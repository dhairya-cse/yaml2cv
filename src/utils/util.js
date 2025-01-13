import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

/**
 * converts input key to title case (from snake case or kebab case)
 * @param input 
 * @returns 
 */
export function formatToTitleCase(input) {
    return input
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
        .replace(/\B\w+/g, (word) => word.toLowerCase());
}

/**
 * Parses a given input string and converts it to a ReactMarkdown component.
 * Also replaces '--' with and en-dash '–'.
 * 
 * @param obj - The input to be parsed. It must be a string
 * @returns - Returns a ReactMarkdown component if the input is a string,
 */
export function parseMarkdown(input) {
    if (typeof input === 'string') {
        const formattedString = replaceWithEnDash(input);
        return (
            <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                    p: ({ node, children }) => <>{children}</>, // Prevent <p> wrapping
                }}
            >
                {formattedString}
            </ReactMarkdown>
        );
    }
    // Return the input as-is if it's not a string (e.g., numbers, booleans)
    return input;
}

export function replaceWithEnDash(input) {
    if (typeof input === 'string')
        return input.replace(/--/g, '–');
    return input;
}

export function mergeMapsRecursive(defaultConfig, config) {
    if (!config) {
        return defaultConfig; // If config is null, return defaultConfig as is
    }

    config.forEach((value, key) => {
        const defaultValue = defaultConfig.get(key);

        if (defaultValue instanceof Map && value instanceof Map) {
            // If both values are maps, merge them recursively
            defaultConfig.set(key, mergeMapsRecursive(defaultValue, value));
        } else {
            // Otherwise, override or add the value in defaultConfig
            defaultConfig.set(key, value);
        }
    });

    return defaultConfig; // Merged map
}