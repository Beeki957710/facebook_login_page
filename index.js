import express from "express";
import path from "path";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017", {
    dbName: "backend"
})
.then(() => console.log("Database connected"))
.catch((e) => console.log(e));

const messageSchema = new mongoose.Schema({
    name: String,
    password: String,
})

const msg = mongoose.model("Message",messageSchema)

const app = express();


app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({extended: true }));
app.set("view engine", "ejs");



app.get("/", (req, res) => {
    res.render("index",{name: "nothing"});
})

app.get("/error", (req, res) => {
    res.render("error");
})

app.post("/p",async(req,res) => {
    await msg.create({ name: req.body.name, password: req.body.password})
    res.redirect("/error")
})



app.listen(5000, () => {
    console.log("Server is running");
})