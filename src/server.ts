import express, { Request, Response } from "express";
import { db } from "./db";
import { usersTable } from "./db/schema";

const app = express();

const PORT = 5000;

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  try{
  //queue
  // const job = await emailQueue.add("welcome-email", {
  //   email: "ajin@example.com",
  //   subject: "Welcome!",
  // });


  // const cacheKey = "users:all";

  // const cachedData = await redisClient.get(cacheKey);

  // if (cachedData !== null) {
  //   console.log("CACHE HIT", cachedData);
    
  //   return res.json({
  //     source: "redis",
  //     data: JSON.parse(cachedData),
  //   });
  // }
  
  // console.log("CACHE MISS");

  const users = await db.select().from(usersTable);

  // await redisClient.set(
  //     cacheKey,
  //     JSON.stringify(users),
  //     { EX: 60 }
  // );

  return res.json({
      source: "database",
      data: users,
    });
  }
  catch(error){
     console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});


async function startServer() {
  try {
    // await connectRedis();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    // await disconnectRedis();
    process.exit(1);
  }
}

startServer();