import { auth } from "@/auth";
import { SignIn, SignOut } from "./auth-component";

export default async function UserButton() {
    const session = await auth();
    if (!session?.user) return <SignIn />
    return (
        <div className="flex gap-2 items-center">
            <span className="hidden text-sm sm:inline-flex">
                {session.user.name}
            </span>
            {/* eslint-disable-next-line */}
            <img 
                src={
                    session.user.image ??
                    "https://source.boringavatars.com/marble/120"
                }
                alt={session.user.name ?? ""}
                className="rounded-full size-8"
            />
            <SignOut />
        </div>
    );
}