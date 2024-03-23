const {userModel}= require("../models");
const subscription = async (query) => {    
    const user = await userModel.updateOne({emailid: query.emailid},
        {
            $set: {
                subscriptionid: query.subscriptionid
            },
            $currentDate: { lastModified: true }


        });
        
        
        return("succesfully modified");
           

        }
module.exports = {
    subscription
}

