require("dotenv").config(); 
const express = require("express");
const app = express();
const functions = require('./functions/functions')


app.get('/txs', async (req, res) => {
    let action = req.query.action
    let date = req.query.date
    let brandId = req.query.brandId

    // If no params passed - get credits for each account
    if (!req.query.action && !req.query.date && !req.query.brandId) {
        console.log('Base Case')
        let accountCredits = await functions.getCredits()
        res.send(accountCredits)
    }

    // Query Specific Brand and Date
    else if (!req.query.action && req.query.date && req.query.brandId) {
        console.log('Brand & Date');
        let accountCredits = await functions.getSpecificCredits(req.query.brandId, req.query.date)
        res.send(accountCredits)
    }

    // Query Specific Brand and Date and Action
    else if (req.query.action && req.query.date && req.query.brandId) {
        console.log('Action & Brand & Date');
        let accountCredits = await functions.getActionSpecificCredits(req.query.action, req.query.brandId, req.query.date)
        res.send(accountCredits)
    }

    // Error message if one query not matching an option above
    else {
        res.send('Error, Query parameteres not accepted')
    }
});


app.listen(3001, () => console.log("Server is running"));