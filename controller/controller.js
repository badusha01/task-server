const User = require("../models/userSchema");


exports.signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "Success",
      user,
    });
  }
   catch (error) {
    res.status(401).json(error);
  }
};

exports.getUsers = async (req, res) => {
  try {

    const page = req.query['page'] || 1;
    const skip = (page - 1) * 15;
    const limit = 15;


    const sort = req.query['sort']?.split(",").join("") || "createdAt";

    console.log(sort);

    delete req.query['page'];
    delete req.query['sort'];


    console.log(req.query);
    const users = await User.find(req.query).sort(sort).skip(skip).limit(limit);
    const count = await User.countDocuments(req.query);
    res.status(200).json({
      status: "success",
      users,
      count
    });
  } 
  catch (error) {
    res.status(404).json({
      status: "failure",
      error
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      user,
    });
  } 
  catch (error) {
    res.status(404).json(error);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
 
    if (!(await user.checkPassword(req.body.password, user.password))) {
      return res.status(401).json({
        status: "failure",
        error: "Invalid Email or password",
      });
    }
 
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(401).json({
      status: "failure",
      error,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      user,
    });
  } 
  catch (error) {
    res.status(404).json(error);
    console.log(error);
  }
};

exports.removeUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "User removed ",
      data: null,
    });
  } 
  catch (error) {
    res.status(404).json({
      status: "User does not exist",
      error
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      user
    })
  } catch (error) {
     res.status(401).json({
      status: "failure",
      error,
     });
  }
}