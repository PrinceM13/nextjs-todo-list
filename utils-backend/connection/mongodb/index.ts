import mongoose from "mongoose";

import { config } from "@/utils-backend";

const url = config.db.url;

const connectMongodb = async () => {
  try {
    await mongoose.connect(url);
    mongoose.connection.on("error", (error) => {
      console.log(`\x1b[31merror!!\x1b[0m Error in MongoDb connection: ${error}`);
    });
    mongoose.connection.on("connected", () => {
      console.log("\x1b[32minfo\x1b[0m Mongoose is connected ");
    });
    mongoose.connection.on("disconnected", () => {
      throw new Error("\x1b[31m\x1b[1mError!\x1b[0m MongoDB disconnected!");
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectMongodb;
