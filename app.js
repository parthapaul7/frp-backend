import { database } from "./database/connect.js";
import { config } from "dotenv";
import {insert} from "./database/upload.js"
import {routing} from "./routes/web.js"

config()

const dbUrl = process.env.DB_URL

database(dbUrl)
// insert()

routing()


