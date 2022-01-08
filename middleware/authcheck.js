import jwt from "jsonwebtoken";
import { authUser } from "../controller/user.js";

const maxAge = 60 * 60 * 32; //this is in seconds

async function signToken(req, res, next) {
  const id= req.params.id

  const auth = await authUser(id)
  
  if( auth.length == 0){
    res.send({error: "wrong enrollment"})
  }
  else{
  const token = jwt.sign({ id }, process.env.SIGN, {
    expiresIn: maxAge,
  });
  // console.log(token);
      res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 });
      res.cookie("cookie is embeeded" );
      res.send(auth)    

    }
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
        res.redirect("/auth");

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
    res.redirect("/auth");
    //redirect to auth page
  }
}

export { check, signToken };
