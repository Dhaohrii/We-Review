const express = require("express");
const cors = require('cors')
const app = express();
const port = 5000;
const db =require("./Database/db")


app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(__dirname + '/../client/dist'))



app.listen(port, () => {
  console.log(`Express app listening on port http://localhost:${port}`);
});
module.exports=app;
