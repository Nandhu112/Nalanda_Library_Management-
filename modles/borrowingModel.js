import mongoose from 'mongoose'

const borrowingSchema =mongoose.Schema({
 
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
     },

    bookId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Book', 
        required: true },

    borrowedAt: { 
        type: Date, 
        default: Date.now 
    },

    returnedAt: { 
        type: Date 
    }

},{
    timestamps: true
})


const Borrow=mongoose.model('Borrow',borrowingSchema )

export default Borrow