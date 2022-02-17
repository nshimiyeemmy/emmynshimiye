
const User = require('../models/users');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



//Registering a user   => /api/v1/users/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    let user = new User ({ 
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email, 
        hashedPassword: bcrypt.hashSync(req.body.password,10),
    })
    user = await user.save();
      res.status(200).json({
        success: true,
        user: user,
      });
    });
  //Admin routes
//Get all Users  => /api/v1/admin/users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find().select('-hashedPassword');
    if (!users || users.length<=0) {
        return next(
          new ErrorHandler(`No users found`, 400)
        );
      }
    res.status(200).json({
      success: true,
      users: users,
    });
  });
  
  //Get user details  => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-hashedPassword');
  if (!user) {
    return next(
      new ErrorHandler(`User not found with id ${req.params.id}`, 400)
    );
  }
  res.status(200).json({
    success: true,
    user: user,
  });
});

// Login a User  => /api/v1/users/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  //check if email and password are entered by the user
  if (!email || !password) {
    return next(new ErrorHandler('Please Enter email & password', 400));
  }
  //finding the user in the database
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler('User not found!', 401));
  }
  const secret = process.env.SECRET;
  if(user && bcrypt.compareSync(req.body.password,user.hashedPassword)){
    const token = jwt.sign(
      {
      userId: user.id,
      isAdmin: user.isAdmin
      }, 
      secret,
      {expiresIn : '1d'}
    )
    res.status(200).json({
      success: true,
      user : user,
      token : token
    });
  }else{
    return next(new ErrorHandler('Password is wrong!', 400));
  }
})

//counting the number of users in the db
exports.userCount = catchAsyncErrors(async (req, res, next) => {
  const userCount = await User.countDocuments();
if(!userCount && userCount<=0){
  return next(new ErrorHandler('No user found', 404));
}
res.status(200).json({
  success: true,
  userCount : userCount
});
})

//Delete User  => /api/v1/admin/users/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User with ${req.params.id} is not found`, 400)
    );
  }
  await user.remove();
  res.status(200).json({
    success: true,
    message: 'User Deleted Successfully',
  });
});
