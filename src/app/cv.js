import { ContactsContainer, SectionHeading, ItemList, SubsectionHeader, SubSectionContainer, SectionContainer } from "./styled-comps";
import { ContactEntry } from "./contact-comps"

export function Resume({ cv, config }) {
    return (
        <ResumeContainer>
            <ResumeTitle title={cv.get('name')} />
            <Contacts contacts={cv.get('contacts')} config={config.get('contacts')} />
            <Sections sections={cv.get('sections')} config={config.get('sections')} />
        </ResumeContainer>
    );
}

function Contacts({ contacts, config }) {
    return (
        <ContactsContainer>
            {contacts.entries.map(([contacts_key, contact], index) => (
                <ContactEntry key={contacts_key} contact_type={contacts_key} config={config.get(contacts_key)} value={contact} />
            ))}
        </ContactsContainer>
    );
}

function Sections({ sections, config }) {
    return (
        <>
            {
                sections.entries.map(([section_key, section], index) => (
                    <Section key={section_key} section_key={section_key} section={section} config={config.get(section_key)} />
                ))
            }
        </>
    );
}

function Section({ section, config }) {
    return (
        <SectionContainer>
            <SectionHeading heading={getSectionTitle(section, section_key)} />
            <SubSections subsections={section.get('subsections')}></SubSections>
            <ItemList items={value} />
        </SectionContainer>
    );
}

function getSectionTitle(section, section_key) {
    if (!section.get('title')) {
        return formatToTitleCase(section_key);
    }
    return section.get('title');
}

/**
 * converts input key to title case (from snake case or kebab case)
 * @param input 
 * @returns 
 */
function formatToTitleCase(input) {
    return input
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
        .replace(/\B\w+/g, (word) => word.toLowerCase());
}

function SubSections({ subsections, section_config }) {
    return (
        <>
            {
                subsections.entries.map(([subsection_key, subsection], index) => (
                    <SubSection subsection={subsection} config={section_config.get(subsection_key)} section_config={section_config} />
                ))
            }
        </>
    );
}


function SubSection({ subsection, config, section_config }) {
    return (
        <SubSectionContainer>
            <SubsectionHeader title={title} subtitle={subtitle} rhsTop={rhsTop} rhsDown={rhsDown} />
            <ItemList items={subsection.items} />
        </SubSectionContainer>
    );
}