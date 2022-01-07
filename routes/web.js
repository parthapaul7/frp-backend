import express from "express";
import cors from "cors";
import { check, signToken } from "../middleware/authcheck.js";
import { authUser } from "../controller/user.js";
// import { cookie } from "express/lib/response";
import cookieParser from "cookie-parser";

// const temp= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2MWQ4N2Y0ODE5MDZiNjM5MjEyZTVmZWQiLCJpYXQiOjE2NDE1OTM2NDksImV4cCI6MTY0MTcwODg0OX0.2vXdAEbNPiCJr8gsuFq3uS4xCU7v8pcewZwAsoXtDC8"

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

async function routing() {
  ///////////////////////////// AUTH Routes ////////////////////
  app
    .route("/auth")
    .get((req, res, next) => {
      res.cookie("token", temp,{maxAge: 1000*60*60*24});
      res.send(
        "ok this is a get request in the auth page, use post request to do auth "
      );
    })
    .post(signToken, async (req, res) => {
      const val = await authUser(req.body.id); // only id parameter used in final will happen through chanelli
      res.send(val); //val contain all user data
    });
  ///////////////////////////// PROJECTS ROUTES /////////////////////

  app
    .route("/project")
    .get(check, (req, res, next) => {
      res.send("ok this is a get request in project ");
    })
    .post(check, (req, res) => {
      res.send("ok this ia a post request in project");
    });

  ////////////////////////////////    LISTENING TO APP //////////////////////

  app.listen(process.env.PORT || 3000, () => {
    console.log(" server is up");
  });
}

export { routing };
