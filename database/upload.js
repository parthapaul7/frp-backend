import { project, projectDetail, testimonialDetail , User} from "../models/models.js";
import { Projects, ProjectDetails, TestimonialDetails, userData } from "./data.js";

async function insertUser(){


////////////////////////////////  DATA COMING FROM CHANEELII /////////////////////////////
let oneUser = {
    applications: { applied: ["1", "3", "5"], bookmarked: ["2", "4"] },
    personalData: {
      userId: 2,
      resumeDetails: {},
      docs: {},
      acadDetails: {
        name: "Studen 2",
        enrollmentNr: "12345678",
        branch: "branch2",
        year: "2nd",
        sem: "3rd",
        cg: "7",
      },
      personalDetails: {
        dob: "20/20/20",
        email: "2@abc.com",
        number: "9999999999",
      },
    },
    notifs: [],
      
    results: [],
  };
  //////////////////// demo data ////////////////////////
  try{
    const isCreated = await User.create(oneUser)
    console.log(isCreated);
    
  }
  catch(err){
      console.warn("user already exits")
    console.log("error in ", err);
  }


}

export {insertUser}