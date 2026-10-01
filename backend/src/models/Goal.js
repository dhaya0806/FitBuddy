import mongoose from "mongoose";
const schema=new mongoose.Schema({userId:mongoose.Schema.Types.ObjectId,title:String,target:String,current:String,progress:Number,unit:String,deadline:Date});
export default mongoose.model("Goal",schema);