const express = require('express');
const data = require("./data")
const cors = require("cors")
const app = express();

app.use(cors());
 app.get("/api/data",(req,res)=>{
  res.status(200).send(data)
 })

const PORT = 5000;
app.listen(PORT,()=>{
  console.log(`server created http://localhost:${PORT}`);
})