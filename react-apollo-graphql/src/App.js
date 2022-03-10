import logo from './logo.svg';
import './App.css';
// import whichever Apollo hooks you're using
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";

const ALL_TRANSACTIONS = gql`
  query AllTransactions {
    transactions {
      _id
		amountOfCredits
		brand
		costPerCredit
		discount
		stripeChargeId
		stripeCustomerId
		transactionDate
		transactionType
  }
}
`;


function App() {
  const { loading, error, data } = useQuery(ALL_TRANSACTIONS);
  console.log(data)

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>encountered an error: {error}</div>;
  } else {
    return (
      <>
      <h1>Hello</h1>
      {data.transactions.map((item, index) => {
        return (
            <div key={index} >
              <p>{item.id}</p>
              <p>{item.amountOfCredits}</p>
              <p>{item.transactionType}</p>
            </div>
        )
      })}
      </>
    )
  }
  // return ({data.map});
  // return (
  //   <div className="App">
  //     <h1>React Apollo</h1>
  //   </div>
  // );
}

export default App;
