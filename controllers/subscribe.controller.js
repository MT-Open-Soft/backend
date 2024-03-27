import { paymentService } from '../services/index.js';
import catchAsync from '../utils/catchAsync.js';



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


export default {    
    createorder,
    verifyorder
};