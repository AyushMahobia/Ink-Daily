const express = require('express');
const app = express();
const port = 3000;
const connectToMongo = require('./db');

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