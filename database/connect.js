import mongoose from "mongoose";



const database = async (dbUrl)=>{

  try {
    await mongoose.connect(dbUrl,{ useNewUrlParser: true } )
  } catch (error) {
    console.log(error);
    
  }

}

export {database}