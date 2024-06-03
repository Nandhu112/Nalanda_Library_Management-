import express from "express";
import { protect,admin } from "../middleware/authMiddleware.js";
const router = express.Router()


import {
    addNewBook,
    updateBook,
    deleteBook,
    listBooks
} from "../controllers/bookController.js"

router.post('/', protect, admin, addNewBook);
router.put('/updateBook', protect, admin,updateBook);
router.delete('/deleteBook/:id', protect, admin, deleteBook);
router.get('/listBooks', protect, listBooks);

export default router