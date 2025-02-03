import { redirect } from "next/navigation";

export default async function Page()
{
    return redirect(`/${process.env.DEFAULT_PROFILE}`);
}