import packageJSON from "@/package.json"

export default function Footer() {
    return (
        <footer className="flex flex-col gap-4 px-4 my-4 mx-0 w-full text-sm sm:flex-row sm:justify-between sm:items-center sm:px-6 sm:my-12 sm:mx-auto sm:max-w-3xl sm:h-5">
            <div className="flex flex-col gap-4 items-center sm:flex-row">
                {/* eslint-disable-next-line */}
                <img 
                    src={"https://github.githubassets.com/favicons/favicon.svg"}
                    alt="github"
                    className="rounded-full size-6"
                />
                <a href="https://github.com/liuyuhe666">Made with ❤️ by Liu Yuhe</a>
            </div>
            <div className="flex flex-col items-center">
                <a href="https://github.com/liuyuhe666/my-github-following">Version: {packageJSON.version}</a>
            </div>
        </footer>
    );
}