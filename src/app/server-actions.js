'use server'
import path from 'path';
import { promises as fs } from "fs";
import { signIn, signOut } from "@/auth"


export async function saveFileOnServer({ userId, content }) {
    try {
        const fileName = `cv.yaml`;
        const filePath = path.join(process.cwd(), `/data/${fileName}`);
        // await fs.mkdir(userDir, { recursive: true });        
        // const filePath = path.join(userDir, fileName);
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