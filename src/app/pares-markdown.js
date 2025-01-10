
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

/**
 * Parses a given input object's leaf nodes and converts it to a ReactMarkdown component.
 * Also replaces '--' with and en-dash '–'.
 * 
 * @param obj - The input to be parsed. It can be a string, an array, or an object.
 * @returns - Returns a ReactMarkdown component if the input is a string,
 * an array of ReactMarkdown components if the input is an array, or an object with parsed values if the input is an object.
 */
export function parseMarkdown(obj) {
    if (typeof obj === 'string') {
        const formattedString = obj.replace(/--/g, '–');
        return <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
                p: ({ node, children }) => <>{children}</>, // Prevent <p> wrapping
            }}
        >
            {formattedString}
        </ReactMarkdown>
    } else if (Array.isArray(obj)) {
        return obj.map(item => parseMarkdown(item));
    } else if (typeof obj === 'object' && obj !== null) {
        const newObj = {};
        for (const key in obj) {
            newObj[key] = parseMarkdown(obj[key]);
        }
        return newObj;
    }
    return obj;
}