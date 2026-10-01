import mongoose from "mongoose";
const schema=new mongoose.Schema({userId:mongoose.Schema.Types.ObjectId,date:{type:Date,default:Date.now},mealType:String,foodName:String,calories:Number,protein:Number,carbs:Number,fat:Number});
export default mongoose.model("Nutrition",schema);