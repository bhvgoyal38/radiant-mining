var express = require("express");
var	app = express();
var bodyParser= require("body-parser");
var searchFor=require("./searchFunction");
var products = require("./product.js");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(function(req, res, next){
	res.locals.products = products;
	next();
});

app.get("/", function(req, res){
	res.render("home", {products: products});
});

app.get("/rr", function(req, res){
	res.render("random");
});

app.post("/search", function(req, res){
	var key = req.body.keyword;
	var results = searchFor(key);
	res.render("search", {results: results, key: key, products: products});
});

app.get("/about-us", function(req, res){
	res.render("about", {products: products});
});

app.get("/gallery", function(req, res){
	res.render("gallery");
});

app.get("/products", function(req, res){
	res.render("product", {products: products});
});

app.get("/contact", function(req, res){
	res.render("contact", {products: products});
});

app.get("/product/:link", function(req, res){
	var result = products.filter(obj => {
 	 return obj.link === req.params.link;
});
	res.render("productDisplay", {result: result[0]});
});

app.listen(3000, 3000, function(){
console.log("Server Started!");	
});