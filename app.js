var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),

  apiOrders = require('./routes/mongo/orders-api'),
  apiClients = require('./routes/mongo/clients-api'),
  apiProviders = require('./routes/mongo/providers-api');
 

// Use native Node promises
mongoose.Promise = global.Promise;
// connect to MongoDB
mongoose.connect('mongodb://localhost/SPA')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
 
var app = module.exports = express();

  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/public'));

  // Set up routes
  app.get('/orders', apiOrders.orders);  
  app.get('/order/:id', apiOrders.order);
  app.put('/order/:id', apiOrders.updateOrder);
  app.post('/order', apiOrders.createOrder);
  
  app.get('/providers', apiProviders.providers);
  
  app.post('/client', apiClients.createClient);
  app.get('/client/:id', apiClients.client);
  app.get('/client', apiClients.clientbyEmail);
  app.put('/client/:id', apiClients.updateClient);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});