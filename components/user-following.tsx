'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { GitHubUserInfo } from '@/lib/github'
import { getUserFollowing } from '@/lib/github'

export default function UserFollowing() {
  const session = useSession()
  const username = session.data?.user.username ?? ''
  const [data, setData] = useState<GitHubUserInfo[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserFollowing(1, username)
      setData(result)
    }
    fetchData()
  }, [username])
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow">
      <Link href="#">
        <h5 className="mt-4 text-2xl text-center font-bold tracking-tight text-gray-900">My GitHub Following</h5>
      </Link>
      <div className="p-4">
        <ul className="divide-y divide-gray-200">
          {
            data.map(item => (
              <li className="py-3 sm:py-4" key={item.id}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image width={32} height={32} src={item.avatar_url} alt="avatar" className="rounded-full" />
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
                    <Link href={item.html_url} target="_blank" title={item.login}>
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                      </svg>

                    </Link>
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
