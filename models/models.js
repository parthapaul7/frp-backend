import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  applications:{ applied: Array, bookmarked: Array},
  personalData: Object,
  notifs: Array,
  results: Array
});
 

const projectSchema = new mongoose.Schema({
    createdAt: String,
    postId: String,
    data:Object,
    image1: String,
    image2: String,
    locationDetails:Array,
    testimonials: Array

})

const projectDetailsSchema =new mongoose.Schema({
    id: String,
    image: String,
    title: String,
})

const testimonialDetailsSchema = new mongoose.Schema({
    id:Number,
    name: String,
    branch: String,
    image: String,
    quote: String,
    year: String
})

const User = mongoose.model("user", userSchema);
const testimonialDetail = mongoose.model("testimonialDetail", testimonialDetailsSchema)
const  project =  mongoose.model("project", projectSchema);
const projectDetail = mongoose.model("projectDetails", projectDetailsSchema )

export  {User,testimonialDetail,project,projectDetail};