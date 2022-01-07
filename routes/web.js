import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function routing() {

  ///////////////////////////// AUTH Routes ////////////////////
  app
    .route("/auth")
    .get((req, res) => {
      res.send("ok this is a get request ");
    })
    .post((req, res) => {
      res.send("ok this ia a post request");
    });
  ///////////////////////////// PROJECTS ROUTES /////////////////////

  app
  .route("/project")
  .get((req, res) => {
    res.send("ok this is a get request in project  ");
  })
  .post((req, res) => {
    res.send("ok this ia a post request in project");
  });

  ////////////////////////////////    LISTENING TO APP //////////////////////

  app.listen(process.env.PORT || 3000, () => {
    console.log(" server is up");
  });
}

export { routing };
