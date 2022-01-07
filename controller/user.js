import {User} from "../models/models.js"
const userid="61d87f481906b639212e5fed";

// in original build userid will come from chaneel i data 

async function authUser(id){
    
    const val = await User.find({"_id":id}) 
        // .clone() is isued because mongoose doesnot allow multiple queries err --> query already exicuted 
     console.log(val,"this is value");
     
    return val;
}



export {userid, authUser}