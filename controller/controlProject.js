import { project } from "../models/models.js";

async function getProjects(){
    const projects = project.find()
    return projects
}

export {getProjects}