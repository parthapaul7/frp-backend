import jwt from "jsonwebtoken";
import { userid } from "../controller/user.js";
import { config } from "dotenv";

const maxAge = 60 * 60 * 32; //this is in seconds

function signToken(req, res, next) {
  const token = jwt.sign({ userid }, process.env.SIGN, {
    expiresIn: maxAge,
  });
  console.log(token);
  res.cookie("token", token);
  next();
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
        res.redirect("/");

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
    res.redirect("/");
    //redirect to auth page
  }
}

export { check, signToken };
