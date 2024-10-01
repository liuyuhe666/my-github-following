import kv from '@/lib/kv'
import { getHashMapKey, getSortedSetKey } from '@/lib/key'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const from = searchParams.get('from') ?? ''
  const to = searchParams.get('to') ?? ''
  const avatar = searchParams.get('avatar') ?? ''
  if (from && to && avatar) {
    if (!await kv.zscore(getSortedSetKey(from), to)) {
      await kv.zadd(getSortedSetKey(from), { score: 1, member: to })
      await kv.hset(getHashMapKey(from), { to: avatar })
    }
    else {
      const num = await kv.zscore(getSortedSetKey(from), to)
      if (num) {
        await kv.zadd(getSortedSetKey(from), { score: num + 1, member: to })
      }
    }
  }
  const htmlUrl = searchParams.get('url') ?? 'https://github.com'
  return Response.redirect(htmlUrl)
}
