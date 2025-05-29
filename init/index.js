const mongoose = require('mongoose');
const initdata = require('./data.js');
const Listing = require('../Models/listing');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
main()
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));


const initDB = async ()=>{
    await Listing.deleteMany({});
    initdata.data =   initdata.data.map((obj)=>({
     ...obj,
     owner: '682867f0eef689e6af68e7c3'
    }))
    await Listing.insertMany(initdata.data);
    console.log('success');
    
}

initDB();