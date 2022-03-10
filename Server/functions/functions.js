
const Schema = require('../Schema/schemas')

// Get all Tx data
getCredits = async () => {
    const data = await Schema.Transaction.find({})
    let dataObj = await createDataObj(data);
    aggMonthlyCredit(dataObj);
    return dataObj
}

// Get Txs for brand & date up to 
getSpecificCredits = async (brandId, date) => {
    let unixTime = await getUnixTime(date)
    const data = await Schema.Transaction.find({id: brandId, transactionDate: { $lte: `${unixTime}`}});
    let dataObj = await createDataObj(data)
    // Add months per request
    await aggMonthlyCredit(dataObj, unixTime)
    return {msg: {dataSearched: date}, data: dataObj};
}

// Get Txs for action, brand, & date up to 
getActionSpecificCredits = async (action, brandId, date) => {
    let unixTime = await getUnixTime(date)
    const data = await Schema.Transaction.find({id: brandId, transactionType: action, transactionDate: { $lte: `${unixTime}`}});
    let dataObj = await createDataObj(data, action)
    return {msg: {dataSearched: date, actionSearched: action, brandSearched: brandId}, data: dataObj};
}
 
// Create response object from DB data
createDataObj = (data, type) => {
    let dataObj = {}
    data.forEach(i => {
        // Create Object for each brand in DB
        if (!dataObj[i.id]) {
            dataObj[i.id] = {
                creditBought: 0,
                creditSpent: 0,
                creditExpired: 0,
                creditRefund: 0,
                totalCredit: 0,
                firstTxTime: 1678450928 // Set to large future date so any transaction will be sooner
            }
        }
        // Sum credit bought, spent, expired per brand
        if (i.transactionType === 'buy') dataObj[i.id].creditBought += i.amountOfCredits;
        if (i.transactionType === 'spend') dataObj[i.id].creditSpent += i.amountOfCredits;
        if (i.transactionType === 'expire') dataObj[i.id].creditExpired += i.amountOfCredits;
        if (i.transactionType === 'refund') dataObj[i.id].creditRefund += i.amountOfCredits;
        // Sum total credit
        if (!type) dataObj[i.id].totalCredit = dataObj[i.id].creditBought + dataObj[i.id].creditRefund - dataObj[i.id].creditSpent - dataObj[i.id].creditExpired;
        // Get oldest tx date
        if (i.transactionDate < dataObj[i.id].firstTxTime) dataObj[i.id].firstTxTime = i.transactionDate
    })
    return dataObj
}

// Convert date passed to Unix TimeStamp
getUnixTime = (date) => {
    let month = date.substring(0,2);
    let day = date.substring(2,4);
    let year = date.substring(4,8)
    return Math.floor(new Date(`${year}.${month}.${day}`).getTime() / 1000);
}

// Task - add 100credit per month
// Tracking months from first transaction per brand until current date or date searched
aggMonthlyCredit = (dataObj, endDate) => {
    let refEndDate;
    if (!endDate) refEndDate = Math.round((new Date()).getTime() / 1000);   // Current date timestamp if none passed
    if (endDate) refEndDate = endDate;     // if date exists in query

    
    for (var x in dataObj){
        let months = Math.floor( (refEndDate - dataObj[x].firstTxTime) / 2592000 ); // Get months between Unix times
        dataObj[x].aggMonthlyCredits = months * 100;    // track monthly aggregated credit
        dataObj[x].totalCredit += months * 100;     // update totalCredit with this number
    }

    return dataObj;
}

module.exports = {getCredits, getSpecificCredits, getActionSpecificCredits}