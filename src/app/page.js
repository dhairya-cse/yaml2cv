// pages/index.js
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { DoubleColumnList, ListItem, Section, SubSection, ResumeContainer, ContactsContainer, ResumeTitle, ItemList} from './styled-comps';
import { parseMarkdown } from './pares-markdown';
import { PhoneContactEntry, LinkedinContactEntry, EmailContactEntry, GithubContactEntry } from './contact-comps'

const Home = () => {

  const filePath = path.join(process.cwd(), '/src/app/data.yaml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  let data = YAML.parse(fileContents);

  return (
    <ResumeContainer>
      <ResumeTitle title={data.personal.name} />
      <ContactsContainer>
        <PhoneContactEntry phone={data.personal.phone} />
        <EmailContactEntry email={data.personal.email} />
        <LinkedinContactEntry linkedin={data.personal.linkedin} />
        <GithubContactEntry github={data.personal.github} />
      </ContactsContainer>

      <Section heading="Experience">
        {data.experience.map((job, index) => (
          <SubSection index={index} title={job.company} subtitle={job.position} rhsTop={parseMarkdown(job.duration)} rhsDown={job.location}>
            <ItemList items={job.responsibilities} />
          </SubSection>
        ))}
      </Section>

      <Section heading="Technical Skills">
        <DoubleColumnList>
          {data.technical_skills.map((skill, index) => (
            <ListItem key={index}><span className='capitalize font-bold'>{Object.keys(skill)[0]}:</span> {Object.values(skill)[0]}</ListItem>
          ))}
        </DoubleColumnList>
      </Section>

      <Section heading="Education">
        {data.education.map((edu, index) => (
          <SubSection index={index} title={edu.institution} subtitle={`${edu.degree}, CGPA: ${edu.cgpa}`} rhsTop={edu.year} rhsDown={edu.ExperienceItemlocation} />
        ))}
      </Section>

      <Section heading="Projects">
        {data.projects.map((project, index) => (
          <SubSection index={index} title={project.name}>
            <ItemList items={project.description} />
          </SubSection>
        ))}
      </Section>

      <Section heading="Miscellaneous">
        <ItemList items={data.miscellaneous} />
      </Section>
    </ResumeContainer>
  );
};

export default Home;