const Task= require("../models/TaskShema")
const  asyncWrapper = require("../middleware/async")
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper( async (req, res) => {
    
      const tasks= await Task.find({})
      res.status(200).json({tasks})
    
  })

  const createTask =asyncWrapper( async (req, res) => {
   
      const task = await Task.create(req.body)
      res.status(201).json({task})
    
 
  })

  const getTask = asyncWrapper( async(req, res) => {
          // const { id: taskID } = req.params
          // const task = await Task.findOne({ _id: taskID })
      const taskId=req.params._id
      const task= await Task.findOne(taskId)
      if (!task){

        return next(createCustomError(`No task with id : ${taskID}`, 404))
      }

      res.status(200).json({task})
    } )
    
  

  const updateTask = asyncWrapper( async(req, res) => {
    
      const taskId=req.params.id
      const rbody=req.body
      const task= await Task.findByIdAndUpdate(taskId,req.body,{
        new:true,
        runValidators:true,
      })

      if (!task){
       
        return next(createCustomError(`No task with id : ${taskID}`, 404))
      }

      res.status(200).json({task})
   
  })

  const deleteTask = asyncWrapper( async(req, res) => {
    
      const taskId=req.params.id
      const task= await Task.findByIdAndDelete(taskId)


      if (!task){
        
        return next(createCustomError(`No task with id : ${taskID}`, 404))
      }

      res.status(200).json({task})
    
  })




  module.exports= {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask 
  }
  