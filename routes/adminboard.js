var express = require('express');
var router = express.Router();
var User = require('../models/user');
var orderplacement = require('../models/orderplacement');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
		if(req.user.name == 'Dheeraj'){
		orderplacement.findall(orderplacement, function(err,orderplacement){
		res.json(orderplacement)
		});



}
	
	
});
//add to cart
router.post('/', function(req, res){
	console.log("postinggg")
	var product =[]
	for(i in req.body.orderDetails){
	var productname = req.body.orderDetails[i].productname;
	var productamount = req.body.orderDetails[i].productname;
	product .push({
		'productname' : productname,
		'productamount' : productamount
	})

	}
	
	var username = req.body.orderDetails[0].username;
	User.getUserByUsername(username, function(err,User){
		email: User.email
	});

	var neworderplacement = new orderplacement({
		username: username,
		product:product
	});

	orderplacement.addToOrder(neworderplacement, function(err, neworderplacement){
	if(err) throw err;
	
	});
	res.send('Success');
});
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;