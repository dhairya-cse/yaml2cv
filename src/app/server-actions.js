'use server'
import path from 'path';
import { promises as fs } from "fs";
import { signIn, signOut } from "@/auth"
import { getLoggedInUser } from '@/utils/server-utils';


export async function saveFileOnServer({ content }) {
    const profile = await getLoggedInUser();
    
    if(!profile) {
        return { success: false, error: "Not authenticated" }
    }

    try {
        const fileName = `cv.yaml`;
        const filePath = path.join(process.env.DATA_DIR, profile, fileName);
        await fs.writeFile(filePath, content, "utf8");
        return { success: true }
    } catch (error) {
        console.error("Error saving file:", error);
        return { success: false, error: "Server Error" };
    }
}


export async function signInAction() {
    await signIn("keycloak")
}

export async function signOutAction() {
    await signOut("keycloak")
}