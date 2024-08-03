const key_prefix = "my-github-following";

export function getUserFollowingListKey(username: string) {
    return `${key_prefix}:${username}:followingList`;
}

export function getUserFollowingKey(username: string, name: string) {
    return `${key_prefix}:${username}:following:${name}`;
}

export function getUserInfoKey(username: string) {
    return `${key_prefix}:${username}:userInfo`;
}