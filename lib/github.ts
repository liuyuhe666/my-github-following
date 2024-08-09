import { storage } from "./storage";
import {
    getUserFollowingListKey,
    getUserFollowingKey,
    getUserInfoKey,
} from "./key";

export async function syncData(username: string) {
    if (!username) return;
    const data = await queryUserFollowingList(1, username);
    const followingNameList: string[] = [];
    for (const item of data) {
        const name: string = item.login;
        followingNameList.push(name);
        // 用户信息
        await storage.setItem(getUserInfoKey(name), item);
        // 访问次数
        if (!await storage.hasItem(getUserFollowingKey(username, name))) {
            await storage.setItem(getUserFollowingKey(username, name), 1);
        }
    }
    await storage.setItem(getUserFollowingListKey(username), followingNameList);
}

async function queryUserFollowingList(page: number = 1, username: string) {
    const url = `https://api.github.com/users/${username}/following?page=${page}&per_page=100`;
    const data = await fetch(url);
    let followingList = await data.json() as any[];
    if (followingList.length >= 100) {
        followingList = followingList.concat(await queryUserFollowingList(page + 1, username));
    }
    return followingList;
}

export async function getFollowingList(username: string) {
    const result: any[] = [];
    if (await storage.hasItem(getUserFollowingListKey(username))) {
        const followingList = await storage.getItem(getUserFollowingListKey(username)) as string[];
        for (const item of followingList) {
            const num = await storage.getItem<number>(getUserFollowingKey(username, item));
            result.push({
                name: item,
                count: num,
            });
        }
        result.sort((a, b) => { return b.count - a.count });
    }
    return result;
}

export async function getUserInfo(username: string) {
    const user = await storage.getItem(getUserInfoKey(username)) as any;
    return user;
}