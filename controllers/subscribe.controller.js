import httpStatus from 'http-status';
import { paymentService } from '../services/index.js';
import catchAsync from '../utils/catchAsync.js';



const createorder = catchAsync(async (req, res) => {
    const {amount,username,emailid,item_name,item_description}= req.body;
    //console.log(query);
    
    const response = await paymentService.createorder(amount,username,emailid,item_name,item_description);
    
    res.send(response);
    

}
);




const verifyorder = catchAsync(async (req, res) => {
    
    const response = await paymentService.verifyorder(req);
    res.status(httpStatus.OK).json(response);
    

}
);


export default {    
    createorder,
    verifyorder
};