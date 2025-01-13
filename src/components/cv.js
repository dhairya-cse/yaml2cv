import { ContactsContainer, SectionHeading, ItemList, SubsectionHeader, SubSectionContainer, SectionContainer, ResumeContainer, ResumeTitle } from "./styled-comps";
import { ContactEntry } from "./contact-comps"
import { formatToTitleCase, replaceWithEnDash } from '../utils/util'
import { useState } from "react";

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
            {Array.from(contacts.entries().map(([contacts_key, contact], index) => (
                <ContactEntry key={contacts_key} contact_type={contacts_key} config={config.get(contacts_key)} value={contact} />
            )))}
        </ContactsContainer>
    );
}

function Sections({ sections, config }) {
    return (
        <>
            {
                Array.from(sections.entries().map(([section_key, section], index) => (
                    <Section key={section_key} section_key={section_key} section={section} config={config.get(section_key) || new Map()} />
                )))
            }
        </>
    );
}

function Section({ section, section_key, config }) {
    return (
        <SectionContainer>
            <SectionHeading heading={getSectionTitle(section, section_key)} />
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
    if (!subsections) {
        return <></>
    }
    return (
        <>
            {
                Array.from(subsections.entries().map(([subsection_key, subsection], index) => (
                    <SubSection subsection={subsection} config={section_config.get(subsection_key) || new Map()} section_config={section_config} />
                )))
            }
        </>
    );
}

function SubSection({ subsection, config, section_config }) {

    const title = getPropertyFromSubsection(subsection, section_config, config, 'title');
    const subtitle = getPropertyFromSubsection(subsection, section_config, config, 'subtitle');
    const rhsTop = getPropertyFromSubsection(subsection, section_config, config, 'rhsTop');
    const rhsBottom = getPropertyFromSubsection(subsection, section_config, config, 'rhsBottom');
    const bullets = getBulletsFromSubsection(subsection, section_config, config);

    return (
        <SubSectionContainer>
            <SubsectionHeader title={title} subtitle={subtitle} rhsTop={replaceWithEnDash(rhsTop)} rhsBottom={rhsBottom} />
            <ItemList items={bullets} />
        </SubSectionContainer>
    );
}

function getBulletsFromSubsection(subsection, section_config, subsection_config) {
    const property = 'bullets'
    const map1 = subsection_config ? (subsection_config.get('field-map') || new Map()) : new Map();
    const map2 = section_config ? (section_config.get('field-map') || new Map()) : new Map();
    const bullets = map1.get(property) || map2.get(property) || property;

    return subsection.get(bullets);
}

function getPropertyFromSubsection(subsection, section_config, subsection_config, property) {
    const map1 = subsection_config ? (subsection_config.get('field-map') || new Map()) : new Map();
    const map2 = section_config ? (section_config.get('field-map') || new Map()) : new Map();
    const template = map1.get(property) || map2.get(property);

    if (template) {
        return subsection.get(template) || template.replace(/{{(\w+)}}/g, (_, key) => subsection.get(key) || '');
    }

    return subsection.get(property);
}