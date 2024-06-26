import { User } from "../models/index.js";
import Razorpay from 'razorpay'; 
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "../utils/config.js";
import crypto from 'crypto'

const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret:RAZORPAY_KEY_SECRET
    
});

const createOrder = async (amount,item_name,item_description,username,emailid)=>{
    try {
        console.log(amount);
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        }

        const order= await razorpayInstance.orders.create(options)
        console.log(order);
        return (
            {
                success:true,
                msg:'Order Created',
                order_id:order.id,
                amount:amount,
                key_id: RAZORPAY_KEY_ID,
                product_name:item_name,
                description:emailid,
                contact:"contact",
                name: username,
                email: item_description
            }
        )           

    } catch (error) {
        console.log(error.message);
    }
}

const subscribeUser = async(query)=> {
 
    const user = await User.findOneAndUpdate({email: query?.email},
        {            
            $set: {                
                subscription: (query?.description)
            },
            $currentDate: { lastModified: true }
        }, {new: true});
        
    if(user == null) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    if(user.subscription == query?.description)
        return {message: "User updated", _id: user._id, name: user.name, subscription: user.subscription }
}
 
const verifyOrder = async (req) => {
    const secret= '12345678'
    
    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')
    console.log(digest, req.headers['x-razorpay-signature'])
    if(digest === req.headers['x-razorpay-signature']){
        // console.log('request is legit')  
        if (req.body.event === 'payment.captured') {    
        const response = await subscribeUser(req.body.payload.payment.entity);
        console.log(response)
        return response
        } else throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Payment failed");
    } else{
        throw new ApiError(httpStatus.BAD_REQUEST, "Bad Request")
    }
}

export default {
    createOrder,
    verifyOrder
}