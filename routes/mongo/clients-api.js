// Create a schema
var  mongoose = require('mongoose');
var ClientSchema = new mongoose.Schema({
	name: String,
	surname: String,
	email: String,
	phone : String,
	updated_at: { type: Date, default: Date.now }
});

// Create a model based on the schema
var Client = mongoose.model('Client', ClientSchema);

exports.client = function(req, res, next) {
	console.log("Client handler!");		
	    Client.findById(req.params.id, function (err, post) {
            if (err) return next(err);
            res.json(post);
    });
};

exports.createClient = function(req, res, next) {
	console.log("Create Client handler!");
	Client.create(req.body, function (err, post) {
        if (err) return next(err);		
        res.json(post);
    });
};

exports.updateClient = function(req, res, next) {
	console.log("Update client handler!");
	Client.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
};

exports.clientbyEmail = function(req, res, next) {
	    console.log("Client by email!");
	    var email = req.query.email;
	    Client.findOne({email: email}, function (err, post){
	       if (err) return next(err);
           res.json(post);
	    });
}

