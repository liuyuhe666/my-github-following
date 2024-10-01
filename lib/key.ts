const KEY_PREFIX = 'my-github-following'

export function getSortedSetKey(username: string) {
  return `${KEY_PREFIX}:${username}:zset`
}

export function getHashMapKey(username: string) {
  return `${KEY_PREFIX}:${username}:hash`
}
