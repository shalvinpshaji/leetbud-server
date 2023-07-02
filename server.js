const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const sessionRoutes = require("./routes/sessions")
const app = express()

app.use((req, res, next) => {
    console.log(req.method, "request ", req.path)
    next()
})
app.use(express.json())
app.use("/api/sessions",sessionRoutes)

app.get("/", (req, res)=>{
    res.json({
        message: "Leetbud server up and running"
    })
})

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to database")
        app.listen(process.env.PORT, ()=>{
            console.log("Listening on port " + process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })