import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task added Successfully",
    });
  } catch (error) {
    console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const tasks = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
        success:false,
        message:"Internal Server error"
    })
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task){ 
      return res.status(400).json({
      success:false,
      message:"Task not found"
  })
  }
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated!",
    });
  } catch (error) {
    console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task){ 
      return res.status(400).json({
        success:false,
        message:"Task not found"
    })
  }
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task Deleted!",
      success: true,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
        success:false,
        message:"Internal Server error"
    })
  }
};
