import express  from "express";
const router= express.Router()

import { authAdmin,logoutAdmin} from "../controllers/adminController.js";

router.post('/auth',authAdmin)
router.post('/logout', logoutAdmin)

export default router
   


