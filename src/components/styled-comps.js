import { formatToTitleCase, parseMarkdown } from '../utils/util'

export function ResumeContainer({ children }) {
return <div className="w-letter bg-white mx-auto p-4 sm:p-8 print:p-0">
        {children}
    </div>;
}

export function SectionHeading({ heading }) {
    return <div className="text-lg font-bold text-navy border-b border-navy border-opacity-35 mb-0 pb-0 break-after-avoid">{heading}</div>
}

export function SectionContainer({ children }) {
    return <section className="mt-1">
        {children}
    </section>;
}

export function SubSectionContainer({ children }) {
    return <div className='mb-1'>{children}</div>
}

export function SubsectionHeader({ title, subtitle, rhsTop, rhsBottom }) {
    return <div className="grid grid-cols-1 sm:grid-cols-[auto,auto] w-auto leading-tight break-inside-avoid-page">
        <div className="font-bold">{title}</div>
        <div className="sm:font-bold sm:text-right text-sm">{rhsTop}</div>
        <div className="text-sm"><em>{subtitle}</em></div>
        <div className="text-sm sm:text-right"><em>{rhsBottom}</em></div>
    </div>
}

export function SubsectionIntroContainer({ children }) {
    return <div className='text-sm'>
        {children}
    </div>
}

export function SectionIntroContainer({ children }) {
    return <div className='text-sm'>
        {children}
    </div>
}

export function List({ children }) {
    return <ul className="list-no-break list-disc ml-8 text-sm leading-snug">{children}</ul>;
}

export function ListItem({ children }) {
    return <li className='pr-3'>{children}</li>;
}

export function ResumeTitle({ title }) {
    return <h1 className="text-4xl mb-1 text-navy tracking-wide text-center" style={{ fontVariant: 'small-caps' }}>{title}</h1>
}

export function ContactsContainer({ children }) {
    return <div className="flex justify-center gap-3 text-sm leading-tight">{children}</div>
}

export function ItemList({ items, columns }) {
    if (!items) {
        return <></>;
    }

    if (Array.isArray(items)) {
        return <List>
            {items.map((misc, index) => (
                <ListItem key={index}>{parseMarkdown(misc)}</ListItem>
            ))}
        </List>
    }

    return <List>
        {
            Array.from(items.entries().map(([key, val], index) => (
                <ListItem key={index}><span className='font-bold'>{formatToTitleCase(key)}:</span> {parseMarkdown(val)}</ListItem>
            )))
        }
    </List>
}