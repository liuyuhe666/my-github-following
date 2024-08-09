import Image from "next/image";
import { getUserInfo } from "@/lib/github";
import Link from "next/link";
import { auth } from "@/auth";

export default async function UserDetail({ name }: {name: string}) {
    const user = await getUserInfo(name);
    const session = await auth();
    return (
        <li className="py-3 sm:py-4">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <Image 
                        className="rounded-full"
                        src={user.avatar_url}
                        width={32}
                        height={32}
                        alt="Avatar" />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {user.login}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {user.html_url}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <Link 
                        href={`/api/visit?username=${session?.user.username}&name=${user.login}&htmlUrl=${user.html_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                            Visit
                        </button>
                    </Link>
                </div>
            </div>
        </li>
    );
}