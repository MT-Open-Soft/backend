import { Schema } from 'mongoose';

const subscriptionSchema = Schema({
    subscriptionName: String,
    subscriptionprice: Number,
    subscriptionbenefits: String
    },
    {
        collection: 'subscriptions'
    }
    );
