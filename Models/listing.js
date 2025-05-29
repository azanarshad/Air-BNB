const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./reviews.js');


const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
       
    },
    price: {
        type: Number,
        
    },
    image: {

        url:String,
        filename:String,
        
    },
    location: {
        type: String,
        
    },
    country: {
        type: String,
        
    },

    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    catagory: {
        type: String,
        enum: ['Trending', 'Rooms', 'Iconic Cities', 'Castles', 'Poolside','Camping','Farms','Arctic','Domes','Boats'],
        default: 'Trending',
    },
    
});

listingSchema.post("findOneAndDelete",async (listing) =>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
   
})

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;