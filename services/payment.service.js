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
const create = async (query)=>{
    try {
        const amount = query.subscriptionid*200*100
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




module.exports = {
    payment,
    create
}