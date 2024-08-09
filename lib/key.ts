// user:76250a37-e3d6-4784-aa28-d74c95b6e658
// user:account:by-user-id:76250a37-e3d6-4784-aa28-d74c95b6e658
// user:account:github:171144077
// user:email:undefined
// user:session:884b6e55-e1e6-4ca2-a526-cfdd4587e112
// user:session:by-user-id:76250a37-e3d6-4784-aa28-d74c95b6e658

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