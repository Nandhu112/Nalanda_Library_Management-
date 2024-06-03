import  jwt  from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../modles/userModel.js";

const protect=asyncHandler(async(req,res,next )=>{
    let token
    token= req.cookies.jwt

    if(token){
        try {
            const decoded= jwt.verify(token,process.env.JWT_SECRET)
            req.user=await User.findById(decoded.user).select('-password')
            next()
            
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized, Invalid token')
            
        }

    }else{
        res.status(401)
        throw new Error('Not authorized, No token')
    }
})


const admin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as an admin');
    }
};


export {
    protect,
    admin
}