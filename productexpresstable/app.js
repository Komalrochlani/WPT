//import libraries
const express=require("express");
const app=express();
const path=require("path");

const bodyparser=require("body-parser");
const routers=require("./router/routes");

//connect middleware
app.use(bodyparser.urlencoded({extended:false}));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.set(express.static(path.join(__dirname,"public")))
//to find all css js floder
app.use("/css",express.static(path.resolve(__dirname,"public/css")))
app.use("/js",express.static(path.resolve(__dirname,"public/js")))
app.use("/image",express.static(path.resolve(__dirname,"public/images")))
//add url handlers
app.use("/",routers)

//start the Server

app.listen(3001,function(){
console.log("Connected to server")})
//this will help to settings in the app in the router
module.exports=app;