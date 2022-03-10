export const getType = /* GraphQL */ `
query getType($type: String){
  transactions(query: {transactionType: $type} ) {
    _id
		amountOfCredits
		costPerCredit
		discount
		id
		stripeChargeId
		stripeCustomerId
		transactionDate
		transactionType
  }
}
`;

