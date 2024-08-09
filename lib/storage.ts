import { createStorage } from "unstorage";
import vercelKVDriver from "unstorage/drivers/vercel-kv";

// Store data in a Vercel KV Store.
export const storage = createStorage({
    driver: vercelKVDriver({
        url: process.env.KV_REST_API_URL ?? "",
        token: process.env.KV_REST_API_TOKEN ?? "",
    })
});