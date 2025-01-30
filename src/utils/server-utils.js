import 'server-only';
import path from 'path';
import { readFile, access, mkdir, copyFile } from 'fs/promises';

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
    const fullPath = path.join(process.env.DATA_PATH, username, 'cv.yaml');
    try {
        await access(fullPath);
        return true;
    } catch (error) {
        return false;
    }
}

export function getLoggedInUser() {
    //TODO: implement this
    return process.env.DEFAULT_PROFILE;
}

export async function createNewCv(username) {
    const userFolderPath = path.join(process.env.DATA_PATH, username);
    const defaultCvPath = path.join(process.env.DATA_PATH, 'cv.yaml');
    const userCvPath = path.join(userFolderPath, 'cv.yaml');

    try {
        await mkdir(userFolderPath, { recursive: true });
        await copyFile(defaultCvPath, userCvPath);
        console.log(`cv.yaml copied to ${userFolderPath}`);
    } catch (error) {
        console.error('Error creating CV:', error);
    }
}