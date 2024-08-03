import Link from "next/link";
import packageJSON from "@/package.json"
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="flex flex-col gap-4 px-4 my-4 mx-0 w-full text-sm sm:flex-row sm:justify-between sm:items-center sm:px-6 sm:my-12 sm:mx-auto sm:max-w-3xl sm:h-5">
            <div className="flex flex-col gap-4 sm:flex-row">
                <Image 
                    src={"https://github.githubassets.com/favicons/favicon.svg"}
                    alt="avatar"
                    width={16}
                    height={16}
                    className="rounded-full"
                />
                <Link href="https://github.com/liuyuhe666">Made with ❤️ by Liu Yuhe</Link>
            </div>
            <div className="flex gap-2 justify-start items-center">
                <Link href="https://github.com/liuyuhe666/my-github-following">Version: {packageJSON.version}</Link>
            </div>
        </footer>
    );
}