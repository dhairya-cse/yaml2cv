'use client'
import { signInAction, signOutAction } from "@/app/server-actions"

export function PrintComponent(){
    return <button onClick={() => window.print()}>Print</button>
}

export function SignInComp(){
    return <button onClick={async()=>await signInAction()}>Log In</button>
}

export function SignOutComp(){
    return <button onClick={async()=>await signOutAction()}>Log Out</button>
}