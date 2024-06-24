const express = require("express"); //express ko import karlo
const app = express(); // app create kar loye

require('dotenv').config(); //.env file me jo bhi data h usko load karao process file ke andar
const PORT = process.env.PORT || 4000; // port ki value nikalo env se, default port 4000 

app.use(express.json()); // jo app h wo express.json use krega, taki body mese data wo parse karke laa paye

//ab database se connect karna h, uske liye ek folder banayenge config, usme hoga database.js

