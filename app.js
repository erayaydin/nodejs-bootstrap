// Dependencies
var fs      = require("fs");
var http    = require("http");
var express = require("express");
var routes  = require("./routes");
var path    = require("path");

// Global Configuration
var app = express();
app.set('port', process.env.PORT || 1453);
app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, "public")));

// Environments
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes
app.get("/", routes.index);
app.get("/ping", routes.ping);

// Run!
app.listen(app.get("port"), function(){
	console.log("\nServer listening on port " + app.get("port"));
});