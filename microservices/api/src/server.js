var express = require('express');
var app = express();
var request = require('request');
const paypal=require('paypal-rest-sdk');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
require('request-debug')(request);

var hasuraExamplesRouter = require('./hasuraExamples');

var server = require('http').Server(app);

router.use(morgan('dev'));

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AVaZDhoqRKcVAba32E5Vfq5U3MQHLujm2Op7fm6cy5zFDQNnEy4e7PLH9wT6KjNVo4McxU2KENTizxst',
  'client_secret': 'ELYC5AoKGX4ixLs0hEhDJFf9rskQszlM4CDQi29mYLPP3LWRbCoCLwglqyH_d_yJKtFm5fKRkglePXOz'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', hasuraExamplesRouter);



app.get("/pay",(req,res)=>{
	
	const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Buy Books",
                "sku": "001",
                "price": "25.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "25.00"
        },
        "description": "This is the payment description."
    }]
};


paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        console.log(payment);
		
		for(let i=0;i<payment.links.length;i++)
		{
			if(payment.links[i].rel=='approval_url')
			{
				res.redirect(payment.links[i].href);
			}
		}
    }
});




})



app.get('/success',(req,res)=>{
	const payerId=req.query.PayerID;
	const paymentId=req.query.paymentId;
	
	const execute_payment_json={
		"payer_id":payerId,
		"transactions":[{
			"amount":{
				"currency":"USD",
				"total":"25.00"
	               }
		}]
	};
	
	paypal.payment.execute(paymentId,execute_payment_json,function(error,payment){
		if(error){
			console.log(error.response);
			throw error;
		}else{
			console.log(JSON.stringify(payment));
			res.send('sucess');
		}
		
	});
})


app.get('/cancel',(req,res)=>res.send('cancelled'));
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
