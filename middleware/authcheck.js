import jwt from "jsonwebtoken";
import { authUser } from "../controller/user.js";

const maxAge = 60 * 60 * 32; 

async function signToken(req, res, next,auth) {
  const id = req.params.id;
  const token = jwt.sign({ id }, process.env.SIGN, {
    expiresIn: maxAge,   //this is in seconds
  });

  res.cookie("token", token, { maxAge : maxAge*1000});
  res.cookie("enrollment", id, {maxAge: maxAge*1000})
  // res.send(auth)
  return 

  //   return token;
}

function check(req, res, next) {
  try {
    const cToken = req.cookies.token;

    const jwtKey = process.env.SIGN; // jwtKey is showing undefined why ????
    //  console.log(token, jwtKey);

    const decode = jwt.verify(cToken, process.env.SIGN, (err, dToken) => {
      if (err) {
        console.log("first error");
        res.send({error:"your are not logged in"})

        //redirect to auth page
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
    //redirect to auth page
  }
}

export { check, signToken };
