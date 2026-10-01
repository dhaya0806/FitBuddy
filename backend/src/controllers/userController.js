import User from "../models/User.js";
export async function me(req,res,next){try{const u=await User.findById(req.user.id).select("-password");res.json(u)}catch(e){next(e)}}
export async function updateProfile(req,res,next){try{const u=await User.findByIdAndUpdate(req.user.id,req.body,{new:true}).select("-password");res.json(u)}catch(e){next(e)}}