const express = require("express");
const cors = require('cors')
const app = express();
const port = 5000;
const db =require("./Database/db")
const bodyParser=require("body-parser")
const userRoute=require("./routes/user")
const shopRoute=require('./routes/shop');
const cookieParser = require("cookie-parser");
const CommentRoute=require('./routes/comments');
const userCheck=require("./controllers/LogonChecker");
const router = require("./routes/shop");

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true, // Allow cookies and credentials
}
app.use(cors(corsOptions));


app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(express.static(__dirname + '/../client/dist'));
app.use("/api/shop",shopRoute);
app.use("/api/user",userRoute);
app.use("/api/comment",CommentRoute);



app.listen(port, () => {
  console.log(`Express app listening on port http://localhost:${port}`);
});
module.exports=app;
