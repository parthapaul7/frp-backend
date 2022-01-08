import { database } from "./database/connect.js";
import { config } from "dotenv";
import { authRoute, loggingOut } from "./routes/authRoute.js";
import projectRoute from "./routes/projectRoute.js";
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import { allUserData } from "./routes/userRoute.js";
import path from "path";

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
app.route("/").get((req,res)=>{
    res.send(    "<h2>instructions</h2>" +
    "to /auth for auth page -- login with channeli and create user in mongo database <br>" +
    "to /authtoken/{enrollment} to get the authtoken ----- the enrollment should be from database<br>"+
    "post request is available with parameter id to /auth  --- to get the jwt token"+
    "to /project  for projects --- protected route<br>" +
    "to /bookmark for get and post bookmarks --- protected route<br>" +
    "to /applied for nos. of applied array ---- protected route<br> " +
    "to /logut  for loggin out and removing token from cookie ---- protected route")
    
})

authRoute();
projectRoute();
allUserData()
loggingOut()
/////////////////////       ROUTING         ///////////////////////



app.listen(process.env.PORT || 3000, () => {
    console.log(" server is up");
  });
