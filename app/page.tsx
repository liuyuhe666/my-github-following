import NoLogin from "@/components/no-login";
import UserFollowing from "@/components/user-following";
import { auth } from "@/auth";


export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-col gap-6">
      { session?.user ? <UserFollowing /> : <NoLogin /> }
    </div>
  );
}
