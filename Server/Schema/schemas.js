const mongoose = require("mongoose");

mongoose.connect(
    `${process.env.MONGODB_URI}`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const txSchema = new mongoose.Schema({
    id: String,
    stripeCustomerId: String,
    stripeChargeId: String,
    transactionDate: String,
    transactionType: String,
    amountOfCredits: Number,
    costPerCredit: String,
    discount: String
},
{ collection : 'transactions_bigger' }
);

const Transaction = mongoose.model('Transcation', txSchema);

module.exports = {Transaction}