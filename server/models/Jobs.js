import mongoose from 'mongoose';

const JobsSchema = new mongoose.Schema({
  category: String,
  roles: [String],
});

const JobsModel = mongoose.model("Jobs", JobsSchema);
export default JobsModel;