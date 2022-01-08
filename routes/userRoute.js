import { app } from "../app.js";
import { check} from "../middleware/authcheck.js";
import {getBkmrkandApplied,updateBookmarks, updateApplied} from "../controller/user.js"

//jwt is used to protect routes

async function allUserData(){
    //////////////////////      BOOKMARKS    //////////////////////////////
    app.route("/bookmark").get(check,async (req,res)=>{
        try {
           const val= await getBkmrkandApplied(req.cookies.enrollment)
           res.send(val.bookmarked)
        } catch (error) {
            console.log(error);
            
        }

    }).post(check ,async (req,res)=>{       // update method can also be used 
            try {
             const val = await updateBookmarks(req.cookies.enrollment, res.body.bookmarks)
                res.send(val)
            } catch (error) {
                console.log(error);
                
            }
    })

    /////////////////////       APPLIED     //////////////////////////////

    app.route("/applied").get(check, async (req,res)=>{
        try {
           const val= await getBkmrkandApplied(req.cookies.enrollment)
           res.send(val.applied)
        } catch (error) {
            console.log(error);
            
        }

    }).post(check,async (req,res)=>{
            try {
             const val = await updateApplied(req.cookies.enrollment, res.body.applied)
                res.send(val)
            } catch (error) {
                console.log(error);
                
            }
    })
    

    /// notification of user and result will come from database itself
}


export {allUserData}