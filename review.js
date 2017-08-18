/**
*Sessions
*Reading/writing Json files
*What do we install

A page you can go to to enter a name and score
A second page to view high scores
Save scores to a Json file
You have viewed the page X times. The page has been viewed Y times
*/

//Express lets us create web servers...so we can get/post
const express = require("express");//npm install express
const mustache = require("mustache-express");
const session = require("express-session");
const fs = require("fs");//built into node, dont need to npm install

const server = express(); //creates an express app

server.engine("mustache", mustache());
server.set("views", "./views");
server.set("view engine", "mustache");

server.use(session({
	secret: "keyboard cat",
	resave: false,
	saveUninitialized: true,
}));

//Creating a route. When people visit oursite (3000/) they should see the word success
server.get("/", function (req, res) {
	fs.readFile("fruits.json", function(error, body){
		// res.send(body);
		res.render("fruits", {
			fruits: JSON.parse(body),
		});
	});
	// res.send("success!");
});

//What is a session?
//You can put as much stuff in the session as you want
//how we log in:
server.get("/secret/fruit", function (req, res) {
	req.session.user_id = 5;
	req.session.signin_time = new Date();

	res.send("logged in");

});

//only accessible if we are logged in:
server.get("/private/fruit", function (req, res) {
	if (req.session.user_id !== undefined) {
		res.send("welcome, user" + req.session.user_id);
	} else {
		res.send("sorry, access blocked");
	}
});

//how we sign out
server.get("/hide/fruit", function (req, res) {
	req.session.destroy();

	res.send("later");

});

server.listen(3000);//Start the server and wait
	console.log("hi")

