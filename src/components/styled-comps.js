import { formatToTitleCase, isEmpty, isString, mapForEach, parseMarkdown } from '../utils/util'

export function ResumeContainer({ children }) {
    return <div className="w-letter bg-white mx-auto p-4 sm:p-8 print:p-0">
        {children}
    </div>;
}

export function SectionHeading({ heading }) {
    return <header className='print:break-after-avoid-page'><h2 className="text-lg font-bold text-navy border-b border-navy border-opacity-35 mb-0 pb-0 print:break-after-avoid-page">{heading}</h2></header>
}

export function SectionContainer({ children }) {
    return <section className="mt-1">
        {children}
    </section>;
}

export function SubSectionContainer({ children }) {
    return <article className='mb-1'>{children}</article>
}

export function SubsectionHeader({ title, subtitle, rhsTop, rhsBottom, link }) {
    return <header className="grid grid-cols-1 sm:grid-cols-[auto,auto] w-auto leading-tight break-inside-avoid-page break-after-avoid-page">
        <h3 className="font-bold"><a href={link}>{title}</a></h3>
        <p className="sm:font-bold sm:text-right text-sm">{rhsTop}</p>
        <p className="text-sm"><em>{subtitle}</em></p>
        <p className="text-sm sm:text-right"><em>{rhsBottom}</em></p>
    </header>
}

export function SubsectionIntroContainer({ children }) {
    if (!children) {
        return <></>;
    }
    return <p className='text-sm'>
        {children}
    </p>
}

export function SectionIntroContainer({ children }) {
    if (!children) {
        return <></>
    }
    return <p className='text-sm print:break-inside-avoid-page'>
        {parseMarkdown(children)}
    </p>
}

export function List({ children, className }) {
    return <ul className={`list-no-break text-sm list-disc ml-8 leading-snug ${className ?? ''}`}>{children}</ul>;
}

export function ListItem({ children }) {
    return <li className='pr-3 break-inside-avoid-page'>{children}</li>;
}

export function ResumeTitle({ title }) {
    return <h1 className="text-4xl mb-1 text-navy tracking-wide text-center" style={{ fontVariant: 'small-caps' }}>{title}</h1>
}

export function ContactsContainer({ children }) {
    return <p className="flex justify-center gap-3 text-sm leading-tight">{children}</p>
}

export function AppContainer({ children }) {
    return <div className="flex h-full overflow-hidden print:contents">
        {children}
    </div>
}


export function EditorContainer({ children }) {
    return <div className="flex-1 bg-white border-r-slate-300 border-r-2 border-black print:hidden">
        {children}
    </div>
}

export function ResumeAppContainer({ children }) {
    return <div className="h-full overflow-y-auto bg-white print:contents" >
        {children}
    </div>
}

function getColumnsClass(columns) {
    if (!columns || typeof columns != 'number') {
        return 'columns-1'
    }
    if (columns == 1) {
        return 'columns-1'
    }
    if (columns == 2) {
        return 'columns-2'
    }
    else {
        return 'columns-3'
    }
}

export function ItemList({ items, columns, className }) {
    if (isEmpty(items)) {
        return <></>;
    }

    className = `${getColumnsClass(columns)} ${className ?? ''}`

    if (Array.isArray(items)) {
        return <List className={className}>
            {items.map((misc, index) => (
                <ListItem key={index}>{parseMarkdown(misc)}</ListItem>
            ))}
        </List>
    }

    if (items instanceof Map) {
        return <List className={className}>
            {
                mapForEach(items, ([key, val], index) => {
                    if (!isString(val)) {
                        return <></>
                    }
                    return <ListItem key={index}><span className='font-bold'>{formatToTitleCase(key)}:</span> {parseMarkdown(val)}</ListItem>
                }
                )
            }
        </List>
    }

    return <></>
}