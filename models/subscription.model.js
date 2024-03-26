const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
    subscriptionName: String,
    subscriptionprice: Number,
    subscriptionbenefits: String
    },
    {
        collection: 'subscriptions'
    }
    );
