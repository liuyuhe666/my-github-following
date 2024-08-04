import { createStorage } from "unstorage";
import vercelKVDriver from "unstorage/drivers/vercel-kv";

// import mongodbDriver from "unstorage/drivers/mongodb";

// // Store data in MongoDB using Node.js MongoDB package.
// export const storage = createStorage({
//     driver: mongodbDriver({
//         connectionString: process.env.MONGODB_URI ?? "",
//         databaseName: "my-github-following",
//         collectionName: "my-github-following",
//     })
// });


// Store data in a Vercel KV Store.
export const storage = createStorage({
    driver: vercelKVDriver({
        url: process.env.KV_REST_API_URL ?? "",
        token: process.env.KV_REST_API_TOKEN ?? ""
    })
});