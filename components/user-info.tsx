import Image from 'next/image'
import { auth } from '@/auth'
import type { GitHubUserInfo } from '@/lib/github'
import { getUserInfoByUsername } from '@/lib/github'

export default async function UserInfo() {
  const session = await auth()
  const username = session?.user.username
  if (!username) {
    return
  }
  const userInfo: GitHubUserInfo = await getUserInfoByUsername(username)
  return (
    <div className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border border-gray-200 rounded-lg shadow">
      <div className="flex flex-col items-center py-10">
        <Image height={96} width={96} src={userInfo.avatar_url} alt="avatar" className="rounded-full" />
        <h5 className="my-1 text-xl font-medium text-gray-900">{userInfo.name ?? userInfo.login}</h5>
        <span className="mb-1 text-sm text-gray-900">{userInfo.bio}</span>
        <div className="flex flex-col gap-y-2">
          <span className="inline-flex text-base text-gray-900">
            <svg className="w-6 h-6 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <span className="ml-2">{`${userInfo.followers} followers · ${userInfo.following} following`}</span>
          </span>
          {userInfo.email && (
            <span className="inline-flex text-base text-gray-900">
              Email:
              <span className="ml-2">{userInfo.email}</span>
            </span>
          )}
          {userInfo.company && (
            <span className="inline-flex text-base text-gray-900">
              Company:
              <span className="ml-2">{userInfo.company}</span>
            </span>
          )}
          {userInfo.location && (
            <span className="inline-flex text-base text-gray-900">
              Location:
              <span className="ml-2">{userInfo.location}</span>
            </span>
          )}
          {userInfo.blog && (
            <span className="inline-flex text-base text-gray-900">
              Blog:
              <span className="ml-2">{userInfo.blog}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
