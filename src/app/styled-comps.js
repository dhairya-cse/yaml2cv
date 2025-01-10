import { parseMarkdown } from './pares-markdown';

export function ResumeContainer({ children }) {
    return <div className="w-dvw sm:w-letter bg-white mx-auto p-4 sm:p-8 print:p-0">
        {children}
    </div>;
}

export function SectionHeading({ heading }) {
    return <div className="text-lg font-bold text-navy border-b border-navy border-opacity-35 mb-0 pb-0 break-after-avoid">{heading}</div>
}

export function Section({ children, heading }) {
    return <section className="mt-1">
        <SectionHeading heading={heading} />
        {children}
    </section>;
}

export function SubSection({ children, title, subtitle, rhsTop, rhsDown }) {
    return <div className='mb-1'>
        <div className="grid grid-cols-1 sm:grid-cols-[auto,auto] w-auto leading-tight break-inside-avoid-page">
            <div className="font-bold">{title}</div>
            <div className="sm:font-bold sm:text-right text-sm">{rhsTop}</div>
            <div className="text-sm"><em>{subtitle}</em></div>
            <div className="text-sm sm:text-right"><em>{rhsDown}</em></div>
        </div>
        {children}
    </div>;
}

export function List({ children }) {
    return <ul className="list-disc ml-8 text-sm leading-snug">{children}</ul>;
}

export function DoubleColumnList({ children }) {
    return <ul className='columns-2 list-disc ml-8 text-sm leading-snug'>
        {children}
    </ul>
}

export function ListItem({children }) {
    return <li className='pr-3'>{children}</li>;
}

export function ResumeTitle({ title }) {
    return <h1 className="text-4xl mb-1 text-navy tracking-wide text-center" style={{ fontVariant: 'small-caps' }}>{title}</h1>
}

export function ContactsContainer({ children }) {
    return <div className="flex justify-center gap-3 text-sm leading-tight">{children}</div>
}

export function ItemList({ items }) {
    return <List>
        {items.map((misc) => (
            <ListItem>{parseMarkdown(misc)}</ListItem>
        ))}
    </List>
}