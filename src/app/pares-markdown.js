
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

/**
 * Parses a given input string and converts it to a ReactMarkdown component.
 * Also replaces '--' with and en-dash '–'.
 * 
 * @param obj - The input to be parsed. It must be a string
 * @returns - Returns a ReactMarkdown component if the input is a string,
 */
export function parseMarkdown(input) {
    if (typeof input === 'string') {
        const formattedString = input.replace(/--/g, '–');
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