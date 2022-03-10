
Goal
<hr>
Create API following the requirements<a href='https://github.com/Trend-io/backEndCodingExercise'>here</a>

<br/>

Server (REST Mongoose)
<hr>
Uploaded json data into MongoDB Atlas collection
Created REST API using Express.js in Server folder to handle endpoint request and response
Connected to MongoDB via Mongoose for data modeling
Utilized request parameters to achieve only one endpoint for each request
Broke logic down into reusable funtions for providing account data

Client (GraphQL Apollo)
<hr>
Briefly set up GraphQL connection via Apollo client with React to test alternative to REST API
If pursued, we could host the graphql schema and backend functions within MongoDB Realm instead of locally running and deploying a server.
Could also integrate triggers and third party APIs with GraphQL all under one accessible endpoint.

<br/>
MongoDB Seup & commands
<hr>
Homebrew setup
brew tap mongodb/brew
brew upgrade mongodb-database-tools

mongocli auth login

Connect Shell
mongosh mongodb+srv://<username>:<password>@cluster0.ye9ed.mongodb.net/trend_sample 

Import 
mongoimport --uri mongodb+srv://<username>:<password>@cluster0.ye9ed.mongodb.net/trend_sample --collection transactions --jsonArray --type json --file assets/transactions.json

mongoimport --uri mongodb+srv://<username>:<password>@cluster0.ye9ed.mongodb.net/trend_sample --collection transactions_bigger --jsonArray --type json --file assets/transactions_bigger.json
