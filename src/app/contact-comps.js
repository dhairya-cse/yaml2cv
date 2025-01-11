export function ContactEntry({ contact_type, config, value }) {
    let icon = config.get('icon');
    let color = config.get('color');
    let text = config.get('text');
    if (!icon) {
        icon = 'fas fa-at';
    }
    if (!color) {
        color = '#333333'
    }
    if (!text) {
        text = getText(contact_type, value);
    }

    return <ContactEntryStyled icon={icon} link={getLink(contact_type, value)} value={text} color={color} />
}

function ContactEntryStyled({ icon, link, color, value }) {
    return <a href={link}>
        <i className={`m-1 ${icon}`} aria-hidden="true" style={{ color }}></i>
        <span className="text-gray-600 text-opacity-90">{value}</span>
    </a>
}


function getLink(contact_type, value) {
    if (contact_type == 'phone') {
        return getPhoneLink(value);
    }

    if (contact_type == 'email') {
        return getEmailLink(value);
    }

    else return getWebLink(value);
}

function getWebLink(url) {
    // Check if the URL starts with "http://" or "https://"
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return `https://${url}`;
    }

    return url;
}

function getEmailLink(email) {
    return `mailto:${email}`;
}

function getPhoneLink(phone) {
    return `tel:${cleanPhoneNumber(phone)}`;
}

function cleanPhoneNumber(phone) {
    return phone
        .trim()
        .replace(/[^\d+]/g, '') // Remove non-numeric characters except '+'
        .replace(/^([^+])/, ''); // Ensure '+' is only valid at the start
}

function getText(contact_type, value) {
    if (contact_type !== 'phone' && contact_type !== 'email') {
        return getLinkWithoutWebPrefix(value);
    }
}

function getLinkWithoutWebPrefix(link) {
    return link.trim().replace(/^https?:\/\/(www\.)?/, '');
}