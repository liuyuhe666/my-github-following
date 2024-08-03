import { createStorage } from "unstorage";
import mongodbDriver from "unstorage/drivers/mongodb";

export const storage = createStorage({
    driver: mongodbDriver({
        connectionString: process.env.MONGODB_URI ?? "",
        databaseName: "my-github-following",
        collectionName: "my-github-following",
    })
});