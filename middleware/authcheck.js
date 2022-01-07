import jwt from "jsonwebtoken"
const jwtKey = "";
const maxAge= 60*60*32;  //this is in seconds

function sign(id){
    const token = jwt.sign({ id }, process.env.SIGN,{
        expiresIn: maxAge
    });
    console.log(token);

    return token;
    
}

function check(req,res,next){

    try{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTY0MTU2NDU5NiwiZXhwIjoxNjQxNjc5Nzk2fQ.H7ClsDxiEl-Tvf_Y4jj6gXy6D3RXHXDLpWDHOl_SLCc"
    const decode = jwt.verify( token,process.env.SIGN,(err,dToken)=>{
        if(err){ console.log("first error");

        //redirect to auth page

        }
        else{
            console.log(dToken, "done"); 
            // login to frp home page 
            next();
        }
        
    })
    console.log(decode);
    

    }
    catch(err){
        console.log( "auth failed");
        //redirect to auth page 
        
    }

}

export {check, sign}