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
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex flex-col items-center py-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={userInfo.avatar_url} alt="avatar" />
        <h5 className="mb-1 text-xl font-medium text-gray-900">{userInfo.name ?? userInfo.login}</h5>
        <span className="text-sm text-gray-500">{userInfo.bio}</span>
      </div>
    </div>
  )
}
