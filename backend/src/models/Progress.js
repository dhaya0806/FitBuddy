import mongoose from "mongoose";
const schema=new mongoose.Schema({userId:mongoose.Schema.Types.ObjectId,date:{type:Date,default:Date.now},weight:Number,bmi:Number,caloriesBurned:Number,workoutMinutes:Number,steps:Number,waterGlasses:Number});
export default mongoose.model("Progress",schema);