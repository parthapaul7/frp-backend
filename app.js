import { database } from "./database/connect.js";
import { config } from "dotenv";
import { authRoute } from "./routes/userRoute.js";
import projectRoute from "./routes/projectRoute.js";
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

export const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.enable("strict routing")

config()

const dbUrl = process.env.DB_URL

database(dbUrl)
/////////////////////       ROUTING         ///////////////////////
authRoute();
projectRoute();
/////////////////////       ROUTING         ///////////////////////



app.listen(process.env.PORT || 3000, () => {
    console.log(" server is up");
  });
