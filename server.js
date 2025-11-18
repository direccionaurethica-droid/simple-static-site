const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, "src")));
app.get("/health", (req,res)=>res.json({status:"ok",time:new Date().toISOString()}));
app.listen(PORT, ()=>console.log(`Serving on http://localhost:${PORT}`));
