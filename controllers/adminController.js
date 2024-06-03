import asyncHandler from "express-async-handler"
import User from "../modles/userModel.js"       
import generateToken from "../utils/generateToken.js"


// @dese Auth admin/set token
// route POST/api/admin/auth
//@access public
const authAdmin = asyncHandler(async (req, res) => {
  console.log( "chk authAdmin111");
    const { email, password } = req.body;

    const admin = await User.findOne({ email, role:"Admin"});

    if (admin && (await admin.matchPassword(password))) {
        generateToken(res, admin._id);
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role
          
        });
    } else {
        res.status(400);
        throw new Error('Invalid email or password');
    }
});


// @dese Logout admin
// route POST/api/admin/logout
//@access public
const logoutAdmin = asyncHandler (async(req,res)=>{
  res.cookie('jwt',"",{
      httpOnly:true,
      expires: new Date(0)
  })
  res.status(200).json({message:" admin logged out "})
 }) 




export {
    authAdmin,
    logoutAdmin,
}
