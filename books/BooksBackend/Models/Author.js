const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
    },
    born: {
        type: Number,
    },
    bookCount: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            unique: false,
        },
    ],
})


module.exports = mongoose.model('Author', schema)
