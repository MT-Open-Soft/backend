import httpStatus from 'http-status';
import { paymentService } from '../services/index.js';
import catchAsync from '../utils/catchAsync.js';

const createOrder = catchAsync(async (req, res) => {
    const {name , email} = req.user;
    const {amount,item_name,item_description}= req.body;   
    const response = await paymentService.createOrder(amount,name,email,item_name,item_description);    
    res.status(httpStatus.OK).json(response);   

}
);

const verifyOrder = catchAsync(async (req, res) => {    
    const response = await paymentService.verifyOrder(req);
    res.status(httpStatus.OK).json(response);   

}
);


export default {    
    createOrder,
    verifyOrder
};