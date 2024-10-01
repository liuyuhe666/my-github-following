import process from 'node:process'
import { createClient } from '@vercel/kv'

const kv = createClient({
  url: process.env.KV_URL ?? 'https://<hostname>.redis.vercel-storage.com',
  token: process.env.KV_REST_API_TOKEN ?? '<token>',
})

export default kv
