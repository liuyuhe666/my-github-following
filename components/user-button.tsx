import Image from 'next/image'
import { SignIn, SignOut } from './auth-component'
import { auth } from '@/auth'

export default async function UserButton() {
  const session = await auth()
  if (!session?.user)
    return <SignIn />
  return (
    <div className="flex gap-2 items-center">
      <span className="hidden text-sm sm:inline-flex">
        {session.user.name}
      </span>
      <Image
        src={
          session.user.image
          ?? ''
        }
        alt={session.user.name ?? 'avatar'}
        height={32}
        width={32}
        className="rounded-full"
      />
      <SignOut />
    </div>
  )
}
