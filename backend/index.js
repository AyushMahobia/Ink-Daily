const express = require('express');
const app = express();
const port = 5000;
const connectToMongo = require('./db');
var cors = require('cors')

app.use(cors())

app.use(express.json());
connectToMongo();

//Avaiable routes
app.use("/api/auth", require('./routes/auth'))
app.use("/api/notes", require('./routes/notes'))

app.get("/",(req, res)=>{
    res.send("hello")
})

//server start
app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`);
})