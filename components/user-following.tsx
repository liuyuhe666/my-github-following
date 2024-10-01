'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import type { GitHubUserInfo } from '@/lib/github'
import { getUserFollowing, getUserFollowingByVisitCount } from '@/lib/github'

export default function UserFollowing() {
  const session = useSession()
  const username = session.data?.user.username
  if (!username) {
    return
  }
  const [tabIndex, setTabIndex] = useState(1)
  const [data, setData] = useState<GitHubUserInfo[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserFollowing(1, username)
      setData(result)
    }

    fetchData()
  }, [])
  const tabClick = async (index: number) => {
    setTabIndex(index)
    if (index === 1) {
      const result = await getUserFollowing(1, username)
      setData(result)
    }
    else if (index === 2) {
      const result = await getUserFollowingByVisitCount(username)
      setData(result)
    }
  }
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow">
      <a href="#">
        <h5 className="my-2 text-2xl text-center font-bold tracking-tight text-gray-900">{`${username}'s following`}</h5>
      </a>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <a
              href="#"
              className={tabIndex === 1 ? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg' : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300'}
              onClick={() => tabClick(1)}
            >
              默认
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              className={tabIndex === 2 ? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg' : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300'}
              onClick={() => tabClick(2)}
            >
              访问次数
            </a>
          </li>
        </ul>
      </div>
      <div className="p-4">
        <ul className="divide-y divide-gray-200">
          {
            data.map(item => (
              <li className="py-3 sm:py-4" key={item.id}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full" src={item.avatar_url} alt="avatar" />
                  </div>
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.name ?? item.login}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {item.html_url}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 hover:text-gray-600">
                    <a href={`/api/visit?url=${item.html_url}&from=${username}&to=${item.login}&avatar=${item.avatar_url}`} target="_blank">
                      访问 GitHub 主页
                    </a>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}
