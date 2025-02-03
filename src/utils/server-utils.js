import 'server-only';
import path from 'path';
import { readFile, access, mkdir, copyFile } from 'fs/promises';
import { log } from 'console';
import { auth } from '@/auth';

export async function loadCvFile(username) {
    return await loadFileContent(path.join('profiles', username, 'cv.yaml'));
}

export async function loadConfigFile() {
    return await loadFileContent(path.join('config', 'config.yaml'));
}

export async function loadFileContent(filePath) {
    filePath = path.join('./data', filePath);
    return await readFile(filePath, 'utf8');
}

export async function cvFileExists(username) {
    const fullPath = path.join('./data', 'profiles', username, 'cv.yaml');

    try {
        await access(fullPath);
        return true;
    } catch (error) {
        return false;
    }
}

export async function getLoggedInUser() {

    try {
        const session = await auth();
        if (session && session.user) {
            return session.user.preferred_username;
        }
    } catch (error) {
        console.log("Error getting logged in user", error);
    }
    return null;
}

export async function createNewCv(username) {
    const userFolderPath = path.join('./data', 'profiles', username);
    const defaultCvPath = path.join('./data', 'config', 'template-cv.yaml');
    const userCvPath = path.join(userFolderPath, 'cv.yaml');

    try {
        await mkdir(userFolderPath, { recursive: true });
        await copyFile(defaultCvPath, userCvPath);
        console.log(`cv.yaml copied to ${userFolderPath}`);
    } catch (error) {
        console.error('Error creating CV:', error);
    }
}

export async function
    getProfile(params) {
    return (await params).profile;
}

export function getCanEdit(profile, loggedInUser) {
    return profile === loggedInUser;
}

export async function getCommonFlags(params) {
    const loggedInUser = await getLoggedInUser();
    const profile = await getProfile(params)
    return {
        loggedInUser: loggedInUser,
        loggedIn: !!loggedInUser,
        profile: profile,
        canEdit: getCanEdit(profile, loggedInUser),
        cvExists: await cvFileExists(profile),
    };
}