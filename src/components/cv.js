'use client'

import { ContactsContainer, SectionHeading, ItemList, SubsectionHeader, SubSectionContainer, SectionContainer, ResumeContainer, ResumeTitle, SubsectionIntroContainer, SectionIntroContainer } from "./styled-comps";
import { ContactEntry } from "./contact-comps"
import { ensureMap, formatToTitleCase, isEmpty, mergeMapsRecursive, replaceWithEnDash } from '../utils/util'

export function Resume({ cv, config }) {

    if (isEmpty(cv)) {
        return <ResumeContainer></ResumeContainer>
    }

    return (
        <ResumeContainer>
            <ResumeTitle title={cv.get('name')} />
            <Contacts contacts={cv.get('contacts')} config={config.get('contacts')} />
            <Sections sections={cv.get('sections')} config={config.get('sections')} />
        </ResumeContainer>
    );
}

function Contacts({ contacts, config }) {

    if (isEmpty(contacts)) {
        return <></>
    }

    return (
        <ContactsContainer>
            {Array.from(contacts.entries().map(([contacts_key, contact], index) => (
                <ContactEntry key={contacts_key} contact_type={contacts_key} config={config.get(contacts_key)} value={contact} />
            )))}
        </ContactsContainer>
    );
}

function Sections({ sections, config }) {

    if (isEmpty(sections)) {
        return <></>
    }

    return (
        <>
            {
                Array.from(sections.entries().map(([section_key, section], index) => (
                    <Section key={section_key} section_key={section_key} section={section} config={config.get(section_key)} />
                )))
            }
        </>
    );
}

function Section({ section, section_key, config }) {

    if (isEmpty(section)) {
        return <></>;
    }

    return (
        <SectionContainer>
            <SectionHeading heading={getSectionTitle(section, section_key)} />
            <SectionIntroContainer>{section.get('description')}</SectionIntroContainer>
            <SubSections subsections={section.get('subsections')} section_config={config}></SubSections>
            <ItemList items={section.get('bullets')} />
        </SectionContainer>
    );
}

function getSectionTitle(section, section_key) {
    if (!section.get('title')) {
        return formatToTitleCase(section_key);
    }
    return section.get('title');
}

function SubSections({ subsections, section_config }) {
    if (isEmpty(subsections)) {
        return <></>
    }
    return (
        <>
            {
                Array.from(subsections.entries().map(([subsection_key, subsection], index) => (
                    <SubSection key={subsection_key} subsection={subsection} config={section_config.get(subsection_key) || new Map()} section_config={section_config} />
                )))
            }
        </>
    );
}

function SubSection({ subsection, config, section_config }) {
    if (isEmpty(subsection)) {
        return <></>
    }

    const field_map_sub = getFieldMap(config);
    const field_map_section = getFieldMap(section_config);

    const field_map = mergeMapsRecursive(field_map_section, field_map_sub);

    const title = getPropertyFromSubsection(subsection, field_map, 'title');
    const subtitle = getPropertyFromSubsection(subsection, field_map, 'subtitle');
    const rhsTop = getPropertyFromSubsection(subsection, field_map, 'rhsTop');
    const rhsBottom = getPropertyFromSubsection(subsection, field_map, 'rhsBottom');
    const desc = getPropertyFromSubsection(subsection, field_map, 'intro');
    const bullets = getBulletsFromSubsection(subsection, field_map);

    return (
        <SubSectionContainer>
            <SubsectionHeader title={title} subtitle={subtitle} rhsTop={replaceWithEnDash(rhsTop)} rhsBottom={rhsBottom} />
            <SubsectionIntroContainer>{desc}</SubsectionIntroContainer>
            <ItemList items={bullets} />
        </SubSectionContainer>
    );
}

function getFieldMap(config) {
    return config ? (config.get('field-map') || new Map()) : new Map();
}

function getBulletsFromSubsection(subsection, field_map) {
    const property = 'bullets'
    const bullets = field_map.get(property) || property;
    return subsection.get(bullets);
}

function getPropertyFromSubsection(subsection, field_map, property) {
    const template = field_map.get(property);

    if (template) {
        return subsection.get(template) || template.replace(/{{(\w+)}}/g, (_, key) => subsection.get(key) || '');
    }

    return subsection.get(property);
}