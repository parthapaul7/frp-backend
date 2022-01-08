import {app} from "../app.js"
import { signToken } from "../middleware/authcheck.js";
import {insertUser} from "../database/upload.js"
import { authUser } from "../controller/user.js";


async function authRoute(){
    app
    .route("/auth")
    .get((req, res, next) => {
      res.send(
        "ok this is a get request in the auth page, use post request to do auth "+
        " Auth page "
      );
    })
    .post(signToken, async (req, res) => {    //jwt is used to protect routes
      await insertUser()
      const val = await authUser(req.body.id); // only id parameter used in final will happen through chanelli
      res.send(val);
    });

  app.route("/authtoken/:id").get(signToken,async (req, res) => {
    console.log("authtoken route");

    // const val = await authUser(req.params.id); // only id parameter used in final will happen through chanelli
  });
}

export {authRoute}


