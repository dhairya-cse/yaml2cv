import { formatToTitleCase, isEmpty, isString, parseMarkdown } from '../utils/util'

export function ResumeContainer({ children }) {
    return <div className="w-letter bg-white mx-auto p-4 sm:p-8 print:p-0">
        {children}
    </div>;
}

export function SectionHeading({ heading }) {
    return <div className="section text-lg font-bold text-navy border-b border-navy border-opacity-35 mb-0 pb-0 print:break-after-avoid-page">{heading}</div>
}

export function SectionContainer({ children }) {
    return <section className="mt-1">
        {children}
    </section>;
}

export function SubSectionContainer({ children }) {
    return <div className='mb-1'>{children}</div>
}

export function SubsectionHeader({ title, subtitle, rhsTop, rhsBottom, link }) {
    return <div className="grid grid-cols-1 sm:grid-cols-[auto,auto] w-auto leading-tight break-inside-avoid-page break-after-avoid-page">
        <div className="font-bold"><a href={link}>{title}</a></div>
        <div className="sm:font-bold sm:text-right text-sm">{rhsTop}</div>
        <div className="text-sm"><em>{subtitle}</em></div>
        <div className="text-sm sm:text-right"><em>{rhsBottom}</em></div>
    </div>
}

export function SubsectionIntroContainer({ children }) {
    if(!children){
        return <></>;
    }
    return <div className='text-sm'>
        {children}
    </div>
}

export function SectionIntroContainer({ children }) {
    if(!children)
    {
        return <></>
    }
    return <div className='text-sm print:break-inside-avoid-page'>
        {parseMarkdown(children)}
    </div>
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
    return <div className="flex justify-center gap-3 text-sm leading-tight">{children}</div>
}

export function AppContainer({ children }) {
    return <div className="flex h-full overflow-hidden print:contents">
        {children}
    </div>
}


export function EditorContainer({children}) {
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
                Array.from(items.entries().map(([key, val], index) => {
                    if (!isString(val)) {
                        return <></>
                    }
                    return <ListItem key={index}><span className='font-bold'>{formatToTitleCase(key)}:</span> {parseMarkdown(val)}</ListItem>
                }
                ))
            }
        </List>
    }

    return <></>
}