import Link from 'next/link'
import Image from 'next/image'
import UserButton from './user-button'

export default function Header() {
  return (
    <header className="sticky flex justify-center border-b">
      <div className="flex items-center justify-between w-full h-16 max-w-3xl px-4 mx-auto sm:px-6">
        <div className="flex gap-4 items-center">
          <Link href="/">
            <Image
              src="https://github.githubassets.com/favicons/favicon.svg"
              alt="Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
          </Link>
          <span className="text-2xl font-bold">GitHub Following</span>
        </div>
        <UserButton />
      </div>
    </header>
  )
}
