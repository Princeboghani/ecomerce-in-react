const express = require('express');
const data = require("./data")
const app = express();


 app.get("/api/data",(req,res)=>{
  res.status(200).send(data)
 })

const PORT = 5000;
app.listen(PORT,()=>{
  console.log(`server created http://localhost:${PORT}`);
})