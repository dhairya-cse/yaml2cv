import 'server-only';
import path from 'path';
import { readFile, access } from 'fs/promises';

export async function loadCvFile(username) {
    return await loadFileContent(path.join(username, 'cv.yaml'));
}

export async function loadConfigFile() {
    return await loadFileContent('config.yaml');
}

export async function loadDefaultResume() {
    return await loadFileContent('cv.yaml');
}

export async function loadFileContent(filePath) {
    filePath = path.join(process.env.DATA_PATH, filePath);
    return await readFile(filePath, 'utf8');
}

export async function cvFileExists(username) {
    const fullPath = path.join(process.env.DATA_PATH, path.join(username, 'cv.yaml'));
    try {
        await access(fullPath);
        return true;
    } catch (error) {
        return false;
    }
}
