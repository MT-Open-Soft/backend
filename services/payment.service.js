import { User } from "../models/index.js";
import Razorpay from 'razorpay'; 

process.loadEnvFile();
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
    
});

const createorder = async (query)=>{
    try {
        const amount = query.amount
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
                key_id: process.env.RAZORPAY_KEY_ID,
                product_name:query.item_name,
                description:query.item_description,
                contact:"contact",
                name: query.username,
                email: query.emailid
            }
        )           

    } catch (error) {
        console.log(error.message);
    }
}

const subscription = async(query)=> {  
 
    const user = await User.updateOne({email: query?.payload?.payment?.entity?.email},
        {
            
            $set: {
                //subscrription name set based on amount
                subscription: (query?.payload?.payment?.entity?.description)
            },
            $currentDate: { lastModified: true }
        });  
            
        
        return("succesfully modified");          

        }


 
const verifyorder = async (req) => {
    const secret= '12345678'
    const crypto = require('crypto')
    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')
    console.log(digest, req.headers['x-razorpay-signature'])
    if(digest === req.headers['x-razorpay-signature']){
        console.log('request is legit')
        console.log (req.body.payload.payment.entity)
        const response = subscription(req.body)
        return (response)

    }
    else{
        console.log('request is not legit')
    }
}

export default {
    createorder,
    verifyorder
}