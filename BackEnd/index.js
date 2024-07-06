const express = require("express");
const cors = require('cors')
const app = express();
const port = 5000;
const db =require("./Database/db")
const bodyParser=require("body-parser")
const userRoute=require("./routes/user")
const shopRoute=require('./routes/shop');
const cookieParser = require("cookie-parser");


app.use(cors())

app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/user',userRoute);
app.use('/api/shop',shopRoute)


app.listen(port, () => {
  console.log(`Express app listening on port http://localhost:${port}`);
});
module.exports=app;
