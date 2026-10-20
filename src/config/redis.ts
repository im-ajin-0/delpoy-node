import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL ?? "redis://127.0.0.1:6379",
});

redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  console.log("Redis connected");
}

export async function disconnectRedis() {
  if (redisClient.isOpen) {
    try {
      await redisClient.quit();
      console.log("Redis disconnected");
    } catch (err) {
      console.error("Failed to disconnect Redis:", err);
    }
  }
}