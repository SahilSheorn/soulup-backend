const express = require ('express');
const dbConnection = require('./configg/dbConnection');
const { addUser,getUser } = require('./controller/registerController');
const app = express();
const port = 5001
app.use(express.json())
dbConnection();
app.post('/register',addUser);
app.get('/register',getUser);

app.listen(port,()=>{
    console.log(`port is running ${port}`) 
})