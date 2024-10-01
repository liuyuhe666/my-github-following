import kv from '@/lib/kv'
import type { GitHubUserInfo } from '@/lib/github'
import { getHashMapKey, getSortedSetKey } from '@/lib/key'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username') ?? ''
  if (!username) {
    return Response.json([])
  }
  const result = await kv.zrange(getSortedSetKey(username), 0, -1) as string[]
  const followingList: GitHubUserInfo[] = []
  for (let i = result.length - 1; i >= 0; i--) {
    const item = result[i]
    const avatar = await kv.hget(getHashMapKey(username), item) as string
    followingList.push({
      login: item,
      avatar_url: avatar,
      html_url: `https://github.com/${item}`,
    })
  }
  return Response.json(followingList)
}
