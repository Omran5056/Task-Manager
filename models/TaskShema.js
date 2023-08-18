const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
   name:{
    type:String,
    required:[true, "must contain name"],
    trim:true,
    maxlength:[10, "name can not be more tahn 10 characters"],
   },
   completed:{
    type:Boolean,
    default:false,
   }
  });
   
const Task = mongoose.model("Task", TaskSchema);
 
module.exports = Task; 