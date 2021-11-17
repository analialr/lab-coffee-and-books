// const Schema = mongoose.Schema;
const { Schema , model } = require('mongoose')

const placeSchema = new Schema({

    name: String,
    type: {
        type: String,
        enum:['coffeshop', 'bookstore']
    },
    location: {
        type: {
          type: String
        },
        coordinates: [Number]
    }
},
{
    timestamps: true
})

placeSchema.index({location: '2dsphere'});

module.exports = model ('Place' , placeSchema);