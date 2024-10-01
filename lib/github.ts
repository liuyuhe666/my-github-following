export interface GitHubUserInfo {
  login: string
  id?: number
  avatar_url: string
  html_url: string
  name?: string
  company?: string
  blog?: string
  location?: string
  email?: string
  bio?: string
  followers?: number
  following?: number
}

export async function getUserInfoByUsername(username: string): Promise<GitHubUserInfo> {
  const response = await fetch(`https://api.github.com/users/${username}`)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return await response.json() as GitHubUserInfo
}

export async function getUserFollowing(page: number = 1, username: string) {
  const url = `https://api.github.com/users/${username}/following?page=${page}&per_page=100`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  let followingList: GitHubUserInfo[] = await response.json() as GitHubUserInfo[]
  if (followingList.length >= 100) {
    followingList = followingList.concat(await getUserFollowing(page + 1, username))
  }
  return followingList
}

export async function getUserFollowingByVisitCount(username: string): Promise<GitHubUserInfo[]> {
  const url = `/api/following?username=${username}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return await response.json() as GitHubUserInfo[]
}
