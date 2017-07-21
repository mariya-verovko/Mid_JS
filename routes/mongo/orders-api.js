// Create a schema
var  mongoose = require('mongoose');
var OrderSchema = new mongoose.Schema({
	orderId: String,
	clientId: mongoose.Schema.Types.ObjectId,
    positions: [],
    orderType: String,
	createDate: Date, 
    closedDate: Date,
	provider: {id: Number, name: String},
	status: String,
	comment: String,
	updated_at: { type: Date, default: Date.now }
  });
  
  // Create a model based on the schema
var Order = mongoose.model('Order', OrderSchema);

var emptyOrder = {"orderId":0 , "clientId":0, "positions": [], "orderType":"", "createDate":"", "provider":"","closedDate":"", "status":"New", "comment":""};

exports.orders = function(req, res, next) {
	console.log("Orders handler!");
	Order.find(function (err, orders) {
        if (err) return next(err);
        res.json(orders);
    });
};

exports.order = function(req, res, next) {
	console.log("Order handler!");
	var _id = req.params.id;
	// Empty object with order counter for id creation at client side
	if (_id == 0) {
	  var counter = 0;
	  var now = new Date();
	  Order.find(function (err, orders) {
		 if (err) return next(err);
		 orders.forEach(function(item){
		   var date = new Date(item.createDate);
		   if (date.getMonth() == now.getMonth()) counter++;
	     });  
		 emptyOrder.id = counter; 
	     res.json(emptyOrder);
      });
	} else {
       Order.findById(req.params.id, function (err, post) {
          if (err) return next(err);
          res.json(post);
       });
    }	   
};

exports.createOrder = function(req, res, next) {
	console.log("Create Order handler!");
	Order.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};

exports.updateOrder = function(req, res, next) {
	console.log("Update order handler!");
	Order.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
};

