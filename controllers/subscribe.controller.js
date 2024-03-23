const {subscribeService,paymentService} = require('../services');
const catchAsync = require('../utils/catchAsync');

const subscription = catchAsync(async (req, res) => {
    const query = req.query;
    const response = await subscribeService.subscription(query);
    res.send(response);
}
);
const payment = catchAsync(async (req, res) => {
    const {id} = req.params;
    const response = await paymentService.payment(id);
    
    res.send(response);
   

}
);

const createorder = catchAsync(async (req, res) => {
    const query = req.query;
    console.log(query);
    
    const response = await paymentService.create(query);
    
    res.send(response);
    

}
);



/*
const verifyorder = catchAsync(async (req, res) => {
    
    const response = await paymentService.verifyorder(req);
    res.send(response);
    if(response.status==="success")
    {
        return(1)
    }
    else{
        return(0)
    }

}
);
*/

module.exports = {
    subscription,
    payment,
    createorder
};