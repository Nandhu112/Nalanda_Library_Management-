import express from "express";
import { protect,admin } from "../middleware/authMiddleware.js";
const router = express.Router()

import {
    BorrowBook,
    returnBook,
    borrowHistory,
    mostBorrowedBooks,
    mostActiveMembers,
    bookAvailability
} from "../controllers/borrowingController.js"

router.post('/', protect, BorrowBook);
router.post('/return', protect, returnBook);
router.get('/history/:userId', protect,borrowHistory);
router.get('/mostBorrowed', protect,mostBorrowedBooks);
router.get('/mostActive', protect,mostActiveMembers);
router.get('/bookAvailability', protect,bookAvailability);

export default router