import { storage } from "./storage";
import {
    getUserFollowingListKey,
    getUserFollowingKey,
    getUserInfoKey,
 } from "./key";
import { Octokit } from "octokit";

const octokit = new Octokit();

export async function initData(username: string) {
    const result = await queryFollowing(1, username);
    const followingList: string[] = [];
    for (let item of result) {
        await storage.setItem(getUserInfoKey(item.login), item);
        followingList.push(item.login);
    }
    await storage.setItem(getUserFollowingListKey(username), followingList);
    for (let item of followingList) {
        await storage.setItem<number>(getUserFollowingKey(username, item), 1);
    }
}

async function queryFollowing(page = 1, username: string) {
    let { data: following } = await octokit.rest.users.listFollowingForUser({
        username,
        per_page: 100,
        page
    });
    if (following.length >= 100) {
        following = following.concat(await queryFollowing(page + 1, username));
    }
    return following;
}

export async function getFollowingList(username: string) {
    const arr: any[] = [];
    if (await storage.hasItem(getUserFollowingListKey(username))) {
        const followingList = await storage.getItem(getUserFollowingListKey(username)) as string[];
        for (const item of followingList) {
            const num = await storage.getItem<number>(getUserFollowingKey(username, item));
            arr.push({
                name: item,
                count: num
            });
        }
        arr.sort((a, b) => { return b.count - a.count });
    }
    return arr;
}

export async function getUserInfo(username: string) {
    const user = await storage.getItem(getUserInfoKey(username)) as any;
    return user;
}