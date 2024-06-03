import asyncHandler from "express-async-handler"
import User from "../modles/userModel.js"       
import generateToken from "../utils/generateToken.js"

// @dese Auth user/set token
// route POST/api/users/auth
//@access public
const authUser= asyncHandler (async(req,res)=>{
 const {email,password}= req.body
 const user=await User.findOne({email})
 if(user && (await user.matchPassword(password))){
    generateToken(res,user._id)
    res.status(201).json({
        _id: user._id,
        name:user.name,
        email:user.email
    })
}
else{
    res.status(400)
    throw new Error('Invalid email or password')
}
}) 

// @dese Register a new user
// route POST/api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  console.log('chk registerUser ');
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res.status(400);
      throw new Error("User already exist");
    }
  
    const user = await User.create({
      name,
      email,
      password,
    });
  
    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }); 

// @dese Logout user
// route POST/api/users/logout
//@access public
const logoutUser = asyncHandler (async(req,res)=>{

    res.cookie('jwt',"",{
        httpOnly:true,
        expires: new Date(0)
    })
    res.status(200).json({message:" user logged out "})
   }) 

export {
    authUser,
    registerUser,
    logoutUser,

} 



    