import { app } from "../app.js";
import { signToken } from "../middleware/authcheck.js";
import { insertUser } from "../database/upload.js";
import { authUser } from "../controller/user.js";

async function authRoute() {
  app
    .route("/auth")
    .get((req, res, next) => {
      res.send(
        "ok this is a get request in the auth page, use post request to do auth " +
          " Auth page "
      );
    })
    .post(async (req, res) => {
      
      try {
        ///////////////     call insertUser()  after chaneeli intigration   ////////////////
        await insertUser();   
      } catch (error) {
        console.log(error);
      }
      const auth = await authUser(req.params.id);

      if (auth.length == 0) {
        res.status(404).json({ error: "wrong enrollment" });
      }
      signToken(req, res, next, auth);
      res.send(auth);
    });

  app.route("/authtoken/:id").get(async (req, res, next) => {
    console.log("authtoken route");

    const auth = await authUser(req.params.id);

    if (auth.length == 0) {
      res.status(404).json({ error: "wrong enrollment" });
    }
    signToken(req, res, next, auth);

    res.send(auth);
  });
}

async function loggingOut() {
  app.route("/logout").get((req, res) => {
    res.cookie("token", "expire", { maxAge: 10 });
    res.cookie("enrollment", "expire", { maxAge: 10 });
    res.send({ msg: "logged Out " });
  });
}

export { authRoute, loggingOut };
