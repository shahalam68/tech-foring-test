import mongoose from 'mongoose';

const JobsSchema = new mongoose.Schema({
    category:String,
    role:String,
})
const JobsModel = mongoose.model("Jobs",JobsSchema)
export default JobsModel;

