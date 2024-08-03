import { auth } from "@/auth";
import { getFollowingList } from "@/lib/github";
import UserDetail from "./user-detail";

export default async function UserFollowing() {
    const session = await auth();
    let data = [];
    if (session?.user) {
      data = await getFollowingList(session.user.username);
    }
    return (
        <div className="mx-auto w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Following
              <span className="bg-blue-100 text-blue-800 text-sm font-medium ml-2 me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{data.length}</span>
            </h5>
          </div>
          <div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {
                data.map(item => <UserDetail key={item.name} name={item.name} />)
              }
            </ul>
          </div>
        </div>
    );
}