const mongoose = require('mongoose');

const mongoUrl = "mongodb://127.0.0.1:27017/inotebook";

const connectToMongo = () => {
    mongoose.connect(mongoUrl).then(()=>{
        console.log("Connected to mogodb successfully");
    }).catch(error=>console.log("Not able to connect with the database"))
    
}

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

module.exports = connectToMongo