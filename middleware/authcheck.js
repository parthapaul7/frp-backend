import jwt from "jsonwebtoken";
import { authUser } from "../controller/user.js";

const maxAge = 60 * 60 * 12; 

async function signToken(req, res, next) {
  let  id = req.params.enrollment;
  if(id == undefined) id = req.body.enrollment;

  const token = jwt.sign({ id }, process.env.SIGN, {
    expiresIn: maxAge,   //this is in seconds
  });

  res.cookie("token", token, { maxAge : maxAge*1000});
  res.cookie("enrollment", id, {maxAge: maxAge*1000})
  // res.send(auth)
  // next();
  return 
}

function check(req, res, next) {
  try {
    const cToken = req.cookies.token;

    const jwtKey = process.env.SIGN; // jwtKey is showing undefined why ????

    const decode = jwt.verify(cToken, process.env.SIGN, (err, dToken) => {
      if (err) {
        console.log("first error");
        res.status(404).json({error:"your are not logged in", msg:"go to /authtoken/<_enrollment> to login or post request,  enrollment should be from database and valid "})

      } else {
        console.log(dToken, "done");
        // login to frp home page
        next();
      }
    });
    console.log(decode);
  } catch (err) {
    const cToken = req.cookies.token;
    console.log("auth failed", err);
     res.send({error:"your are not logged in"})

  }
}

export { check, signToken };
