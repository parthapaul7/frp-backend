import { app } from "../app.js";
import { check, signToken } from "../middleware/authcheck.js";
import { insertUser } from "../database/upload.js";
import { authUser } from "../controller/user.js";

async function authRoute() {
  app
    .route("/auth")
    .get((req, res, next) => {
      res.send("<h1> this is Auth </h1> ");
    })
    .post(async (req, res, next) => {
      try {
        ////     call insertUser()  after chaneeli intigration   ////////////////
        await insertUser();
      } catch (error) {
        console.log(error);
      }
      console.log(req.body.enrollment);
      
      const auth = await authUser(req.body.enrollment);

      if (auth.length == 0) {
        res.status(404).json({ error: "wrong enrollment" });
      }
      signToken(req, res,next );
      res.send(auth);
    });
  ///////      /authtoken method is used with parameter id because browser cannot send post request to get the auth token //////
  app.route("/authtoken/:enrollment").get(async (req, res, next) => {
    console.log("authtoken route");

    const auth = await authUser(req.params.enrollment);

    if (auth.length == 0) {
      res.status(404).json({ error: "wrong enrollment" });
    }
    signToken(req, res, next, auth);

    res.send(auth);
  });
}

async function loggingOut() {
  app.route("/logout").get(check,(req, res) => {
    res.cookie("token", "expire", { maxAge: 10 });
    res.cookie("enrollment", "expire", { maxAge: 10 });
    res.send({ msg: "logged Out " });
  });
}

export { authRoute, loggingOut };
