
<h2>Goal<h2>
<hr>
Create API following the requirements<a href='https://github.com/Trend-io/backEndCodingExercise'>here</a>

<br>
<br>

<h3>Server (REST Mongoose)</h3>
<hr>
<ul>
<li>Uploaded json data into MongoDB Atlas collection</li>
<li>Created REST API using Express.js in Server folder to handle endpoint request and response</li>
<li>Connected to MongoDB via Mongoose for data modeling</li>
<li>Utilized request parameters to achieve only one endpoint for each request</li>
<li>Broke logic down into reusable funtions for providing account data</li>
</ul>
<br>
<br>

<h3>Client (GraphQL Apollo)</h3>
<hr>
<ul>
<li>Briefly set up GraphQL connection via Apollo client with React to test alternative to REST API</li>
<li>If pursued, we could host the graphql schema and backend functions within MongoDB Realm instead of locally running and deploying a server.</li>
<li>Could also integrate triggers and third party APIs with GraphQL all under one accessible endpoint.</li>
</ul>
<br>
<br>

<h3>MongoDB Seup & commands</h3>
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
