import {User} from "../models/models.js"

// in original build userid will come from chaneel i data 

async function authUser(id){
    
    const val = await User.find({"personalData.acadDetails.enrollmentNr":id}) 
        // .clone() is isued  mongoose doesnot allow multiple queries err --> query already exicuted 
     console.log(val,"this is value");
     
    return val;
}



export {authUser}