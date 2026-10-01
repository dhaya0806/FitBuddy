import Workout from "../models/Workout.js";
export async function list(req,res,next){try{res.json(await Workout.find({userId:req.user.id}).sort({createdAt:-1}))}catch(e){next(e)}}
export async function create(req,res,next){try{res.status(201).json(await Workout.create({...req.body,userId:req.user.id}))}catch(e){next(e)}}
export async function complete(req,res,next){try{res.json(await Workout.findOneAndUpdate({_id:req.params.id,userId:req.user.id},{completed:true,completedAt:new Date()},{new:true}))}catch(e){next(e)}}