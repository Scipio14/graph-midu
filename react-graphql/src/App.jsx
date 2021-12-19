import { gql, useQuery } from "@apollo/client";
import Persons from "./Persons";
import logo from "./logo.svg";

const ALL_PERSONS = gql`
  {
    allPersons {
      id
      name
      phone
      address {
        street
        city
      }
    }
  }
`;

const App = () => {
  const { data, error, loading } = useQuery(ALL_PERSONS);
  //console.log(data.allPersons);
  if (error) return <span style="color:red">{error}</span>;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo react" className="App-logo" />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1>GraphQL + React</h1>
            <Persons persons={data.allPersons} />
          </>
        )}
      </header>
    </div>
  );
};

export default App;
