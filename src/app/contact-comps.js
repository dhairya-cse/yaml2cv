export function ContactEntry({ color, icon, alt, text, link }) {
    return (
        <p>
            <a href={link}>
                <i className={`m-1 ${icon}`} aria-hidden="true" style={{ color }}></i>
                <span className="text-gray-600 text-opacity-90">{text}</span>
            </a>
        </p>
    );
}

function getEmailLink(email) {
    return `mailto:${email}`;
}

function getPhoneLink(phone) {
    return `tel:${phone}`;
}

function getLinkWithoutWebPrefix(link) {
    return link.replace(/^https?:\/\/(www\.)?/, '');
}

function getPhoneTextFormatted(phone) {
    return phone.replace(/(\+\d{2})(\d{4})(\d{6})/, '$1 $2 $3');
}

export function EmailContactEntry({ children, email }) {
    return (
        <ContactEntry
            text={email}
            link={getEmailLink(email)}
            icon="fa fa-envelope"
            color="#EA4335"
        />
    );
}

export function PhoneContactEntry({ children, phone }) {
    return (
        <ContactEntry
            text={getPhoneTextFormatted(phone)}
            link={getPhoneLink(phone)}
            icon="fas fa-phone-alt"
            color="#6e7abb"
        />
    );
}

export function LinkedinContactEntry({ children, linkedin }) {
    return (
        <ContactEntry
            text={getLinkWithoutWebPrefix(linkedin)}
            link={linkedin}
            icon="fab fa-linkedin"
            color="#0077b5"
        />
    );
}

export function GithubContactEntry({ children, github }) {
    return (
        <ContactEntry
            text={getLinkWithoutWebPrefix(github)}
            link={github}
            icon="fab fa-github"
            color="#333333"
        />
    );
}
