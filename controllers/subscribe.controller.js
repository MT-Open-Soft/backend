const {paymentService} = require('../services');
const catchAsync = require('../utils/catchAsync');



const createorder = catchAsync(async (req, res) => {
    const query = req.body;
    console.log(query);
    
    const response = await paymentService.createorder(query);
    
    res.send(response);
    

}
);




const verifyorder = catchAsync(async (req, res) => {
    
    const response = await paymentService.verifyorder(req);
    res.send(response);
    

}
);


module.exports = {    
    createorder,
    verifyorder
};