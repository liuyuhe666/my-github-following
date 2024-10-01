import { SessionProvider } from 'next-auth/react'
import NoLogin from '@/components/no-login'
import UserInfo from '@/components/user-info'
import { auth } from '@/auth'
import UserFollowing from '@/components/user-following'

export default async function Home() {
  const session = await auth()
  if (!session?.user) {
    return <NoLogin />
  }
  return (
    <div className="flex flex-col gap-6">
      <UserInfo />
      <SessionProvider session={session}>
        <UserFollowing />
      </SessionProvider>
    </div>
  )
}
