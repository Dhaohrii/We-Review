const express = require("express");
const cors = require('cors')
const app = express();
const port = 5000;
const db =require("./Database/db")
const bodyParser=require("body-parser")
const userRoute=require("./routes/user")
const shopRoute=require('./routes/shop')
const CommentRoute=require('./routes/comments')

app.use(cors());

app.use(bodyParser.json());
app.use(express.json({limit:'500mb'}));
app.use(express.urlencoded({extended:true, limit:'500mb'}));
app.use(express.static(__dirname + '/../client/dist'));
app.use("/api/shop",shopRoute);
app.use("/api/user",userRoute);
app.use("/api/comment",CommentRoute);


app.listen(port, () => {
  console.log(`Express app listening on port http://localhost:${port}`);
});
module.exports=app;
