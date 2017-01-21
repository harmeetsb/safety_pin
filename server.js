var express = require("express");
var app = express();
app.set('view engine', 'ejs');
//app.use(express.static("views"));

app.get("/", function(req, res){
    console.log("hello")
    res.render("index");
});
app.get("/hello", function(req, res){
    console.log("hello")
    //res.render("index.html");
});

app.listen(process.env.PORT | 3000, process.env.IP, function(){
    console.log("Server is running");
});