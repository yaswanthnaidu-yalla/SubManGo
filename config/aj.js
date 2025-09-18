import arcjet from "@arcjet/node";
import { shield, detectBot, tokenBucket } from "@arcjet/node";
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), `.env.development.local`) });




const aj = arcjet({
key: process.env.ARCJET_KEY,
rules: [
  shield({ mode: "LIVE" }),
  detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE"] }),
  tokenBucket({ mode: "LIVE", refillRate: 5, interval: 10, capacity: 10 }),
  ],
});

export default aj;