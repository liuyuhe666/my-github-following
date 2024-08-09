import { storage } from "@/lib/storage";
import { getUserFollowingKey } from "@/lib/key";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
    const name = searchParams.get('name');
    const htmlUrl = searchParams.get('htmlUrl') ?? "https://github.com";
    if (username && name && await storage.hasItem(getUserFollowingKey(username, name))) {
        const num = await storage.getItem(getUserFollowingKey(username, name)) as number;
        if (num) {
            await storage.setItem(getUserFollowingKey(username, name), num + 1);
        }
    }
    return Response.redirect(htmlUrl);
}