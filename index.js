const express = require("express"); //express ko import karlo
const app = express(); // app create kar loye

//config load
require('dotenv').config(); //.env file me jo bhi data h usko load karao process file ke andar
const PORT = process.env.PORT || 4000; // port ki value nikalo env se, default port 4000

//JSON middleware
app.use(express.json()); // jo app h wo express.json use krega, taki body mese data wo parse karke laa paye

//ab database se connect karna h, uske liye ek folder banayenge config, usme hoga database.js

//index.js me ab database import kara lenge
require("./config/database").connect();

//route ko import karo and mount karo
//route naamka folder banao aur usme routes dalo
//ham ek user bana lete h aur route ko import kara lenge
const user = require("./routes/user");
app.use("/api/v1/",user); // app.use krte user ko mount kara diya api/v1 pe

//server ko activate karne ke liye
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});

//ab routes define karenge
