const {userModel}= require("../models");
const Razorpay = require('razorpay'); 

//const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_k6ufi601xH7LZQ',
    key_secret: 'GtBbIQ2TUUAiPVxDxvCa3EFy'
    
});

const payment = async (id) => {    
    const users = await userModel.find({subscriptionid :id});    
    return users; 
    
}

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
                key_id: 'rzp_test_k6ufi601xH7LZQ',
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
    console.log (query?.payload?.payment?.entity?.email)
    const user1 =await userModel.findOne({email: query?.payload?.payment?.entity?.email}); 
    console.log(user1); 
    const user = await userModel.updateOne({email: query?.payload?.payment?.entity?.email},
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

module.exports = {
    payment,
    createorder,
    verifyorder
}