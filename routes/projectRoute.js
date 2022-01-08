import {app} from "../app.js"
import { check } from "../middleware/authcheck.js";
import {getProjects} from "../controller/controlProject.js"
//jwt is used to protect routes


export default async function projectRoute(){
    app
    .route("/project")
    .get(check, async (req, res, next) => {
      const val= await getProjects()
      res.send(val);
    })
    .post(check, (req, res) => {
      res.send("ok this ia a post request in project");
    });

}