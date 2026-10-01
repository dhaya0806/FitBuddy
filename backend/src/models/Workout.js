import mongoose from "mongoose";
const schema=new mongoose.Schema({userId:mongoose.Schema.Types.ObjectId,name:String,category:String,level:String,duration:Number,calories:Number,exercises:[{name:String,sets:Number,reps:Number,rest:Number}],completed:{type:Boolean,default:false},completedAt:Date},{timestamps:true});
export default mongoose.model("Workout",schema);