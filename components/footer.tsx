import Image from 'next/image'
import Link from 'next/link'
import packageJSON from '@/package.json'
import { siteInfo } from '@/constants'

export default function Footer() {
  return (
    <footer className="flex flex-col gap-4 px-4 my-4 mx-0 w-full text-sm sm:flex-row sm:justify-between sm:items-center sm:px-6 sm:my-12 sm:mx-auto sm:max-w-3xl sm:h-5">
      <div className="flex flex-col gap-4 items-center sm:flex-row">
        <Image
          src="https://github.githubassets.com/favicons/favicon.svg"
          alt="github"
          width={24}
          height={24}
          className="rounded-full"
        />
        <Link href={siteInfo.authorGitHubLink} target="_blank">Made with ❤️ by Liu Yuhe</Link>
      </div>
      <div className="flex flex-col items-center">
        <Link href={siteInfo.repoLink} target="_blank">
          Version:
          {packageJSON.version}
        </Link>
      </div>
    </footer>
  )
}
