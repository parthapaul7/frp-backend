import { User } from "../models/models.js";

// in original build userid will come from chaneel i data

/////       ID IS ENROLLMENT NO. HERE    ///////
// "personalData.acadDetails.enrollmentNr": id 

async function authUser(id) {
  const users = await User.find();

   const val= users.filter(e=>{
    //    console.log(e.personalData.acadDetails.enrollmentNr , id);
      return e.personalData.acadDetails.enrollmentNr == id
  })
  // .clone() is isued  mongoose doesnot allow multiple queries err --> query already exicuted
  console.log(val, "this is value");

  return val;
}

async function getBkmrkandApplied(id) {
  const val = await User.find({ "personalData.acadDetails.enrollmentNr": id });

  const bookmarked = val.map((e) => e.applications.bookmarked);
  const applied = val.map(e=>e.applications.applied)

  return {bookmarked,applied};
}

async function updateBookmarks(id, bkmark) {
  const val = await User.updateOne(
    { "personalData.acadDetails.enrollmentNr": id },
    { "applications.bookmarked": bkmark }
  );

  return val
}

async function updateApplied(id,appied){
    const val = await User.updateOne(
        { "personalData.acadDetails.enrollmentNr": id },
        { "applications.applied": applied }
      );

      return val

}
export { authUser, getBkmrkandApplied , updateBookmarks , updateApplied};
